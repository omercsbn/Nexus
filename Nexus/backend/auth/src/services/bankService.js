const BankAccount = require('../models/bankAccountModel');

exports.createBankAccount = async (bankAccountData) => {
    const bankAccount = new BankAccount(bankAccountData);
    await bankAccount.save();
    return bankAccount;
};

exports.getBankAccounts = async (userId) => {
    const bankAccounts = await BankAccount.find({ userId });
    return bankAccounts;
};

exports.updateBankAccount = async (bankAccountId, updateData) => {
    const bankAccount = await BankAccount.findByIdAndUpdate(bankAccountId, updateData, { new: true });
    return bankAccount;
};

exports.deleteBankAccount = async (bankAccountId) => {
    await BankAccount.findByIdAndRemove(bankAccountId);
};
