document.addEventListener('DOMContentLoaded', async () => {
    const transactionList = document.getElementById('transaction-list');

    // Функция для загрузки транзакций
    const fetchTransactions = async () => {
        const res = await fetch('/api/transactions');
        if (res.ok) {
            const transactions = await res.json();
            transactionList.innerHTML = '';
            transactions.forEach(t => {
                const li = document.createElement('li');
                li.textContent = `${t.description}: $${t.amount}`;

                // Кнопка для изменения транзакции
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    document.getElementById('description').value = t.description;
                    document.getElementById('amount').value = t.amount;
                    document.getElementById('transactionForm').dataset.id = t.id;  // Присваиваем ID
                });

                // Кнопка для удаления транзакции
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', async () => {
                    if (t.id) {
                        console.log('Deleting transaction with id:', t.id);  // Логируем ID для проверки
                        const res = await fetch(`/api/transactions/${t.id}`, { method: 'DELETE' });
                        if (res.ok) {
                            await fetchTransactions();  // Перезагружаем транзакции после удаления
                        } else {
                            alert('Failed to delete transaction');
                        }
                    } else {
                        console.log('Transaction ID is missing');
                    }
                });

                li.appendChild(editButton);
                li.appendChild(deleteButton);
                transactionList.appendChild(li);
            });
        } else {
            alert('Failed to load transactions');
        }
    };

    // Форма для добавления и редактирования транзакций
    document.getElementById('transactionForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const transactionId = e.target.dataset.id;

        if (transactionId) {
            // Если id есть, это значит, что мы редактируем транзакцию
            console.log('Editing transaction with id:', transactionId);  // Логируем ID для проверки
            const res = await fetch(`/api/transactions/${transactionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, amount })
            });
            if (res.ok) {
                await fetchTransactions();
                e.target.reset();
                delete e.target.dataset.id;  // Снимаем id после отправки формы
            } else {
                alert('Failed to edit transaction');
            }
        } else {
            // Если id нет, это значит, что мы добавляем новую транзакцию
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, amount })
            });
            if (res.ok) {
                await fetchTransactions();
                e.target.reset();
            } else {
                alert('Failed to add transaction');
            }
        }
    });

    await fetchTransactions();
});

