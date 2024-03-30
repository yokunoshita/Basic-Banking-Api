const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    //user baru + profile
    registerUser: async (req, res, next) => {
        try {
            let {name, email, password, identity_type, identity_number, address} = req.body;

            let exist = await prisma.users.findFirst({
                where: {email}
            });

            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already exist'
                });
            }

            let user = await prisma.users.create({
                data:{
                    name,
                    email, 
                    password,
                    profiles: {
                        create:{
                            identity_type, 
                            identity_number, 
                            address 
                        }
                    }
                },
                include: {
                    profiles: true
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: user
            });
            
        } catch (error) {
            next(error)
        }
    },

    //akun baru ke existed user
    registerAccount: async (req, res, next) => {
        try {
            let {users_id,bank_name, bank_account_number, balance} = req.body;

            let newAccount = await prisma.bankAccount.create({
                data:{
                    bank_name,   
                    bank_account_number, 
                    balance,
                    users: {
                        connect: {id: Number(users_id)}
                    }
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: newAccount
            });
            
        } catch (error) {
            next(error)
        }
    },

    //transfer money
    transfer: async (req, res, next) => {
        let {source_account_id, destination_account_id, amount} = req.body;

        try {
            let sourceAccount = await prisma.bankAccount.findUnique({
                where: {id: Number(source_account_id)},
            });

            let destinationAccount = await prisma.bankAccount.findUnique({
                where: {id: Number(destination_account_id)},
            });

            if (!source_account_id || !destination_account_id) {
                return res.status(404).json({
                    status: false,
                    message: 'cant find the accounts'
                });
            }

            if (amount > sourceAccount.balance) {
                return res.status(400).json({
                    status: false,
                    message: 'your balance is not enough'
                });
            }

            let transfer = await prisma.transactions.create({
                data:{
                    source_account_id:sourceAccount.id,
                    destination_account_id:destinationAccount.id,
                    amount,
                }
            });

            //update balance when transfet = true
            await prisma.bankAccount.update({
                where: {id: Number(source_account_id)},
                data: {
                    balance: sourceAccount.balance - amount
                }
            });

            await prisma.bankAccount.update({
                where: {id: Number(destination_account_id)},
                data: {
                    balance: destinationAccount.balance + amount
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: transfer
            });
        } catch (error) {
            next(error)
        }
    }
}