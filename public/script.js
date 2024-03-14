
document.addEventListener('DOMContentLoaded', function() {
    fetch('/analyze')
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messages-container');
            messagesContainer.style.margin="auto";

            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.borderRadius="10px";
                // card.style.border="2px solid black";
                card.style.boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px";
            

                // Apply color based on sentiment score
                if (item.color) {
                    card.style.backgroundColor = item.color;
                } else {
                    // Default color
                    card.style.backgroundColor = 'yellow';
                }

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = `${item.message} - Sentiment: ${item.sentiment}`;
                cardText.style.fontSize="1.2rem";

                cardBody.appendChild(cardText);
                card.appendChild(cardBody);
                messagesContainer.appendChild(card);
            });
        })
        .catch(error => console.error('An error occurred while fetching data:', error));
});

