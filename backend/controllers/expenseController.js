import Expense from "../models/expenseModel.js";
import Group from "../models/groupModel.js";

export const addExpense = async (req, res) => {
  try {
    const { description, amount, paidBy, splitAmong } = req.body;
    const expense = await Expense.create({
      groupId: req.params.groupId,
      description,
      amount,
      paidBy,
      splitAmong,

    });

    // Update group balances: +amount to paidBy, -share to each in splitAmong
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Ensure balances array exists
    if (!Array.isArray(group.balances)) {
      group.balances = [];
    }

    const findBalanceIndex = (userId) =>
      group.balances.findIndex((b) => String(b.user) === String(userId));

    const incrementBalance = (userId, delta) => {
      const idx = findBalanceIndex(userId);
      if (idx === -1) {
        group.balances.push({ user: userId, amount: delta });
      } else {
        group.balances[idx].amount += delta;
      }
    };

    const share = amount / (splitAmong?.length || 1);
    // Credit the payer with full amount
    incrementBalance(paidBy, amount);
    // Debit each participant with their share
    if (Array.isArray(splitAmong)) {
      splitAmong.forEach((userId) => incrementBalance(userId, -share));
    }

    await group.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ groupId: req.params.groupId })
    .populate("paidBy splitAmong", "name");
  res.json(expenses);
};

export const getSummary = async (req, res) => {
  const group = await Group.findById(req.params.groupId).populate("members", "name");
  const expenses = await Expense.find({ groupId: req.params.groupId });

  const balances = {};
  group.members.forEach(m => balances[m._id] = { name: m.name, balance: 0 });

  expenses.forEach(e => {
    const share = e.amount / (e.splitAmong.length);
    e.splitAmong.forEach(u => (balances[u] ? balances[u].balance -= share : null));
    if (balances[e.paidBy]) balances[e.paidBy].balance += e.amount;
  });

  const balArr = Object.entries(balances).map(([id, v]) => ({
    id, name: v.name, balance: +v.balance.toFixed(2)
  }));

  const debtors = balArr.filter(b => b.balance < -0.01);
  const creditors = balArr.filter(b => b.balance > 0.01);
  debtors.sort((a, b) => a.balance - b.balance);
  creditors.sort((a, b) => b.balance - a.balance);

  const settlements = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(-debtors[i].balance, creditors[j].balance);
    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: pay.toFixed(2),
    });
    debtors[i].balance += pay;
    creditors[j].balance -= pay;
    if (Math.abs(debtors[i].balance) < 0.01) i++;
    if (Math.abs(creditors[j].balance) < 0.01) j++;
  }
  const groupUpdated = await Group.findById(req.params.groupId).populate("balances.user", "name");
  const populatedBalances = (groupUpdated?.balances || []).map((b) => ({
    name: b.user?.name || "Unknown",
    amount: b.amount,
  }));
  res.json({ balances: populatedBalances, settlements });
};
