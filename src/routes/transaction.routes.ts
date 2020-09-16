import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    /*
      Route <-> Repository <-> Model

    */

    // usar repository para pegar transactions no model
    const transactions = transactionsRepository.all();

    // criar objeto com totais de income, outcome e saldo entre eles.
    const balance = transactionsRepository.getBalance();

    const extract = { transactions, balance };

    return response.status(200).json(extract);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    /*

    [ ] Receber as variáveis.
    [ ] Cria a Transaction.
      {
        "id": "uuid",
        "title": "Salário",
        "value": 3000,
        "type": "income"
      }

    */
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({ title, value, type });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
