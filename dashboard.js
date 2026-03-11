/* ==========================================
   VyapaarAI – Dashboard JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', async () => {

    // ============ SIDEBAR TOGGLE (Mobile) ============
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.className = 'fas fa-xmark';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                sidebarToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }

    // ============ SALES CHART (Chart.js) ============
    const salesCanvas = document.getElementById('salesChart');

    if (salesCanvas && typeof Chart !== 'undefined') {
        const ctx = salesCanvas.getContext('2d');

        // Actual data for last 6 months
        const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        const actualSales = [82000, 95000, 110000, 88000, 105000, 125000];

        // Predicted next month
        const predictedMonth = 'Apr (Predicted)';
        const allLabels = [...months, predictedMonth];
        const actualWithNull = [...actualSales, null];
        const predictedLine = [null, null, null, null, null, 125000, 145000];

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: allLabels,
                datasets: [
                    {
                        label: 'Actual Sales',
                        data: actualWithNull,
                        borderColor: '#6c63ff',
                        backgroundColor: 'rgba(108, 99, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#6c63ff',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                    },
                    {
                        label: 'Predicted',
                        data: predictedLine,
                        borderColor: '#a855f7',
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        borderWidth: 3,
                        borderDash: [8, 5],
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#a855f7',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointStyle: 'triangle',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1a1a5e',
                        titleColor: '#fff',
                        bodyColor: '#c4b5fd',
                        padding: 14,
                        cornerRadius: 12,
                        titleFont: { family: 'Outfit', size: 14, weight: '700' },
                        bodyFont: { family: 'Inter', size: 13 },
                        callbacks: {
                            label: function (context) {
                                if (context.raw === null) return '';
                                return `₹${context.raw.toLocaleString('en-IN')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12, weight: '500' },
                            color: '#6b7280'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.04)',
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: 'Inter', size: 12 },
                            color: '#6b7280',
                            callback: function (value) {
                                return '₹' + (value / 1000) + 'K';
                            }
                        },
                        beginAtZero: false,
                        suggestedMin: 60000,
                        suggestedMax: 160000
                    }
                }
            }
        });
    }

    // ============ AI CHAT ASSISTANT ============
    const chatFab = document.getElementById('chatFab');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat
    if (chatFab && chatWindow) {
        chatFab.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            if (chatWindow.classList.contains('open')) {
                chatFab.innerHTML = '<i class="fas fa-xmark"></i>';
                chatInput.focus();
            } else {
                chatFab.innerHTML = '<i class="fas fa-robot"></i>';
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('open');
            chatFab.innerHTML = '<i class="fas fa-robot"></i>';
        });
    }

    // AI Responses map
    const aiResponses = {
        'profit': {
            pattern: /profit|fayda|kamai|munafa/i,
            response: 'Your profit this month is <strong>₹35,000</strong>. It is <strong>12% higher</strong> than last month. 📈 Your top contributing product is Rice (Basmati) with ₹8,400 profit.'
        },
        'sales': {
            pattern: /sales|sell|bikri|selling|revenue/i,
            response: 'Today\'s sales are <strong>₹12,450</strong> so far. This month\'s total is <strong>₹1,25,000</strong>, which is 10% higher than last month! 🎉'
        },
        'stock': {
            pattern: /stock|inventory|maal|saman|restock/i,
            response: 'You have <strong>3 items with low stock</strong>: Rice (20 kg), Tea (8 packs), and Milk Powder (5 packs). I recommend restocking Rice within <strong>3 days</strong>. 📦'
        },
        'prediction': {
            pattern: /predict|forecast|next month|next week|agla mahina/i,
            response: 'Based on AI analysis, next month\'s predicted sales are <strong>₹1,45,000</strong> (+16%). 🔮 Rice demand may increase by 15% due to festival season.'
        },
        'rice': {
            pattern: /rice|chawal/i,
            response: 'Rice (Basmati) current stock: <strong>20 kg</strong> 🔴 Low. Average daily sales: 7 kg. It will run out in ~3 days. Festival season may push demand up by <strong>15%</strong>.'
        },
        'hello': {
            pattern: /hello|hi|hey|namaste|namaskar/i,
            response: 'Namaste! 🙏 How can I help you today? Ask me about your sales, profit, inventory, or predictions!'
        },
        'help': {
            pattern: /help|kya kar sakta|what can you/i,
            response: 'I can help you with:\n• 📊 Sales data & trends\n• 💰 Profit analysis\n• 📦 Inventory status\n• 🔮 Sales predictions\n• 💡 Business suggestions\n\nJust ask in plain language!'
        },
        'thank': {
            pattern: /thank|dhanyabad|shukriya/i,
            response: 'You\'re welcome! 😊 I\'m always here to help your business grow. Feel free to ask anytime!'
        }
    };

    function getAIResponse(message) {
        const lower = message.toLowerCase().trim();

        for (const key in aiResponses) {
            if (aiResponses[key].pattern.test(lower)) {
                return aiResponses[key].response;
            }
        }

        // Default response
        return 'I understand your question! 🤔 Currently I can help with <strong>sales, profit, inventory, and predictions</strong>. Try asking something like "How much profit this month?" or "What items are low stock?"';
    }

    function addMessage(content, isUser) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${isUser ? 'user' : 'bot'}`;

        if (!isUser) {
            msg.innerHTML = `<div class="bot-label"><i class="fas fa-robot"></i> VyapaarAI</div>${content}`;
        } else {
            msg.textContent = content;
        }

        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'chat-msg bot';
        typing.id = 'typingIndicator';
        typing.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI thinking delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, false);
        }, 800 + Math.random() * 600);
    }

    if (chatSend) {
        chatSend.addEventListener('click', handleSendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }

    // ============ METRIC CARD ANIMATIONS ============
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 120);
    });

    // ============ AI CARD ANIMATIONS ============
    const aiCards = document.querySelectorAll('.ai-card');
    aiCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 400 + index * 150);
    });

    // ============ TABLE ROW ANIMATIONS ============
    const tableRows = document.querySelectorAll('.inventory-table tbody tr');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        setTimeout(() => {
            row.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 300 + index * 80);
    });

    // ============ DYNAMIC USER DATA & TOP NAVBAR ============
    const dashboardStoreName = document.getElementById('dashboardStoreName');
    const dashboardUserName = document.getElementById('dashboardUserName');
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    const dropdownFullShopName = document.getElementById('dropdownFullShopName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const navUserName = document.getElementById('navUserName');
    const navUserIcon = document.getElementById('navUserIcon');

    const vyapaarUserStr = localStorage.getItem('vyapaarUser');
    const vyapaarShopType = localStorage.getItem('vyapaarShopType');

    if (vyapaarUserStr) {
        try {
            const vyapaarUser = JSON.parse(vyapaarUserStr);
            if (dashboardUserName) dashboardUserName.textContent = vyapaarUser.name.split(' ')[0];
            if (navUserName) navUserName.textContent = vyapaarUser.name.split(' ')[0];
            if (navUserIcon) navUserIcon.textContent = vyapaarUser.name.charAt(0).toUpperCase();
            if (dropdownFullShopName) dropdownFullShopName.textContent = vyapaarUser.shopName || vyapaarUser.shopType || "My Shop";
            if (dropdownUserEmail) dropdownUserEmail.textContent = vyapaarUser.email || "user@example.com";
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }

    // Toggle Profile Dropdown
    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = profileDropdown.style.display === 'block';
            profileDropdown.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('vyapaarUser');
            localStorage.removeItem('vyapaarShopType');
            localStorage.removeItem('vyapaarPendingUser');
            window.location.href = 'index.html';
        });
    }

    if (dashboardStoreName) {
        let displayShopName = vyapaarShopType || 'Retail Shop';
        if (vyapaarUserStr) {
            try {
                const user = JSON.parse(vyapaarUserStr);
                if (user.shopName) displayShopName = user.shopName;
            } catch (e) { }
        }
        dashboardStoreName.textContent = displayShopName;
    }

    // ============ DYNAMIC SALES DATA FROM SHOP ============
    let salesData = [];
    if (vyapaarUserStr) {
        try {
            const user = JSON.parse(vyapaarUserStr);
            if (user._id) {
                const res = await fetch(`http://localhost:5000/api/sales/${user._id}`);
                if (res.ok) {
                    salesData = await res.json();
                }
            }
        } catch (e) { console.error('Failed to fetch sales from backend', e); }
    }

    // Fallback to local storage
    if (!salesData || salesData.length === 0) {
        const vyapaarSalesDataStr = localStorage.getItem('vyapaarSalesData');
        if (vyapaarSalesDataStr) {
            try {
                salesData = JSON.parse(vyapaarSalesDataStr);
            } catch (e) { console.error("Failed to parse local sales string", e); }
        }
    }

    if (salesData && salesData.length > 0) {
        // Calculate Total Sales
        const totalSales = salesData.reduce((sum, item) => sum + item.price, 0);

        // Assuming 30% fake margin for "Profit" calculation
        const totalProfit = Math.round(totalSales * 0.3);

        // Update Metric Cards
        const todaySalesValue = document.getElementById('todaySalesValue');
        const monthlyProfitValue = document.getElementById('monthlyProfitValue');
        const todaySalesCountValue = document.getElementById('todaySalesCountValue');

        if (todaySalesValue) {
            // Pre-existing hardcoded value is 12450. We add dynamic sales to it.
            const finalSales = 12450 + totalSales;
            todaySalesValue.textContent = '₹' + finalSales.toLocaleString('en-IN');
        }

        if (monthlyProfitValue) {
            // Pre-existing hardcoded value is 35000.
            const finalProfit = 35000 + totalProfit;
            monthlyProfitValue.textContent = '₹' + finalProfit.toLocaleString('en-IN');
        }

        if (todaySalesCountValue) {
            // Assuming base count is 18, we add dynamically tracked sales length.
            const finalCount = 18 + salesData.length;
            todaySalesCountValue.textContent = finalCount;
        }

        // Process Item Counts for "Top Selling Products"
        const itemCounts = {};
        salesData.forEach(sale => {
            const saleName = sale.itemName || sale.name; // Backend uses itemName, local uses name
            if (itemCounts[saleName]) {
                itemCounts[saleName].count += 1;
                itemCounts[saleName].revenue += sale.price;
            } else {
                itemCounts[saleName] = { count: 1, revenue: sale.price };
            }
        });

        // Sort items by revenue
        const sortedItems = Object.keys(itemCounts)
            .map(name => ({ name, revenue: itemCounts[name].revenue }))
            .sort((a, b) => b.revenue - a.revenue);

        // Update "Top Products List"
        const topProductsList = document.getElementById('topProductsList');
        if (topProductsList && sortedItems.length > 0) {
            // Clear existing hardcoded
            topProductsList.innerHTML = '';

            // Take top 4 or less
            const topItemsToRender = sortedItems.slice(0, 4);
            topItemsToRender.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="item-name">${item.name}</span><span class="item-value">₹${item.revenue.toLocaleString('en-IN')}</span>`;
                topProductsList.appendChild(li);
            });
        }

        // Update "Recent Activity List"
        const recentActivityList = document.getElementById('recentActivityList');
        if (recentActivityList) {
            // Get the last 4 items sold
            // DB returns descending, localstorage returns ascending. So lets standardize:
            const recentSales = salesData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 4);

            const existingActivities = Array.from(recentActivityList.children);
            recentActivityList.innerHTML = '';

            const allActivitiesHTML = [];

            // Add new dynamic sales
            recentSales.forEach(sale => {
                const saleName = sale.itemName || sale.name;
                allActivitiesHTML.push(`<li><span class="item-name">Sale — ${saleName}</span><span class="item-value text-green">+ ₹${sale.price}</span></li>`);
            });

            // Add old hardcoded sales back
            existingActivities.forEach(li => {
                allActivitiesHTML.push(li.outerHTML);
            });

            // Keep only top 4
            recentActivityList.innerHTML = allActivitiesHTML.slice(0, 4).join('');
        }
    }

});
