const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    //daftar users
    indexUser: async (req, res, next) => {
        try {
            let listUser = await prisma.users.findMany({
                include: {profiles: true},
            });

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: listUser
            });
        } catch (error) {
            next(error)
        }
    },

    //detail user
    showUser: async (req, res, next) => {
        let userId = Number(req.params.userId);

        try {
            let user = await prisma.users.findUnique({
                where: {id: userId},
                include: {profiles: true}
            });

            if (!user) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find user with id : "+id,
                    data: null
                });
            }
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: user
            });
        } catch (error) {
            next(error)
        }
    },

    //list account
    indexAccount:async (req, res, next) => {
        try {
            let listAccount = await prisma.bankAccount.findMany({
                include: {
                    users: true
                },
            });

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: listAccount
            });
        } catch (error) {
            next(error)
        }
    },

    //detail account
    showAccount: async (req, res, next) => {
        let accountId = Number(req.params.accountId);

        try {
            let account = await prisma.bankAccount.findUnique({
                where: {id: accountId},
                include: {users: true}
            });

            if (!account) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find the account",
                    data: null
                });
            }

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: account
            });
        } catch (error) {
            next(error)
        }
    },

    //list transaction
    indexTransaction: async (req, res, next) => {
        try {
            let transactions = await prisma.transactions.findMany();
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: transactions
            });
        } catch (error) {
            next(error)
        }
    },

    //detail transaction
    showTransaction: async (req, res, next) => {
        let transactionId = Number(req.params.transactionId);

        try {
            let transaction = await prisma.transactions.findUnique({
                where: {id: transactionId},
                include:{
                    bank_account: true
                }
            });

            if (!transaction) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find the transaction",
                    data: null
                });
            }
            
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: transaction
            });
        } catch (error) {
            next(error)
        }
    }
}