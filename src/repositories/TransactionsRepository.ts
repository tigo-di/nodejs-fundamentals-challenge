import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  private sum(type: string): number {
    return this.transactions.reduce(
      (acc, cur) => acc + (cur.type === type ? cur.value : 0),
      0,
    );
  }

  public getBalance(): Balance {
    // TODO

    const sumIncome = this.sum('income');

    const sumOutcome = this.sum('outcome');

    const total = sumIncome - sumOutcome;

    const balance = { income: sumIncome, outcome: sumOutcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
