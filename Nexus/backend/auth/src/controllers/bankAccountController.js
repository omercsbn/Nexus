const BankAccount = require('../models/bankAccountModel');
const bankService = require('../services/bankService');

exports.createBankAccount = async (req, res) => {
    try {
        const { accountNumber, bankName, balance } = req.body;
        const userId = req.user.id;

        const bankAccount = await bankService.createBankAccount({
            userId,
            accountNumber,
            bankName,
            balance
        });

        res.status(201).json(bankAccount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBankAccounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const bankAccounts = await bankService.getBankAccounts(userId);
        res.json(bankAccounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateBankAccount = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const updateData = req.body;

        const bankAccount = await bankService.updateBankAccount(bankAccountId, updateData);

        if (!bankAccount) {
            return res.status(404).json({ msg: 'Bank account not found' });
        }

        res.json(bankAccount);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteBankAccount = async (req, res) => {
    try {
        const bankAccountId = req.params.id;

        await bankService.deleteBankAccount(bankAccountId);

        res.json({ msg: 'Bank account deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
