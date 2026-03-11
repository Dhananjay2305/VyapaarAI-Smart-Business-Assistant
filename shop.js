/* ==========================================
   VyapaarAI – Shop Items JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', async () => {

    const shopTitle = document.getElementById('shopTitle');
    const itemsGrid = document.getElementById('itemsGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const offersGrid = document.getElementById('offersGrid');
    const shopSearch = document.getElementById('shopSearch');
    const categoryPills = document.querySelectorAll('.category-pill');
    const toast = document.getElementById('toast');

    // Get Shop Type and User info
    const vyapaarShopType = localStorage.getItem('vyapaarShopType') || 'Retail Shop';
    const vyapaarUserStr = localStorage.getItem('vyapaarUser');
    let displayShopName = vyapaarShopType;

    if (vyapaarUserStr) {
        try {
            const user = JSON.parse(vyapaarUserStr);
            if (user.shopName) displayShopName = user.shopName;
        } catch (e) { }
    }

    if (shopTitle) {
        shopTitle.textContent = displayShopName;
    }

    // Define Items based on shop type
    const shopCatalogs = {
        'Retail Shop': [
            { id: 'ret_f1', name: 'Rice', price: 60, icon: 'fa-bowl-rice', category: 'Grocery', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', rating: 4.5 },
            { id: 'ret_f2', name: 'Wheat Flour (Atta)', price: 50, icon: 'fa-wheat-awn', category: 'Grocery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80', rating: 4.2 },
            { id: 'ret_f5', name: 'Cooking Oil', price: 150, icon: 'fa-bottle-droplet', category: 'Grocery', image: 'https://images.unsplash.com/photo-1474979266404-7eaacabc8d0f?auto=format&fit=crop&w=300&q=80', rating: 4.7 },
            { id: 'ret_p1', name: 'Soap', price: 35, icon: 'fa-soap', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=300&q=80', rating: 4.3 },
            { id: 'ret_p4', name: 'Toothpaste', price: 80, icon: 'fa-tooth', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1559599238-308793637427?auto=format&fit=crop&w=300&q=80', rating: 4.6 },
            { id: 'ret_h1', name: 'Detergent Powder', price: 120, icon: 'fa-soap', category: 'Grocery', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80', rating: 4.1 },
            { id: 'ret_sn1', name: 'Chips', price: 20, icon: 'fa-cookie', category: 'Grocery', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80', rating: 4.4 },
            { id: 'ret_hp1', name: 'Paracetamol', price: 30, icon: 'fa-pills', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', rating: 4.8 }
        ],
        'Clothing Shop': [
            { id: 'clo1', name: 'T-Shirts', price: 300, icon: 'fa-shirt', category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80', rating: 4.5 },
            { id: 'clo2', name: 'Shirts', price: 600, icon: 'fa-shirt', category: 'Clothing', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80', rating: 4.3 },
            { id: 'clo3', name: 'Jeans', price: 1000, icon: 'fa-user-tie', category: 'Clothing', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80', rating: 4.6 },
            { id: 'clo6', name: 'Jackets', price: 1500, icon: 'fa-vest', category: 'Clothing', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80', rating: 4.7 }
        ],
        'Electronics Shop': [
            { id: 'ele1', name: 'Smartphones', price: 15000, icon: 'fa-mobile-screen', category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80', rating: 4.8 },
            { id: 'ele2', name: 'Laptops', price: 45000, icon: 'fa-laptop', category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80', rating: 4.9 },
            { id: 'ele6', name: 'Headphones', price: 1500, icon: 'fa-headphones', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80', rating: 4.6 },
            { id: 'ele16', name: 'Smart Watches', price: 3000, icon: 'fa-clock', category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80', rating: 4.5 }
        ],
        'Grocery Shop': [
            { id: 'gro1', name: 'Rice', price: 60, icon: 'fa-bowl-rice', category: 'Grocery', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', rating: 4.5 },
            { id: 'gro5', name: 'Cooking Oil', price: 150, icon: 'fa-bottle-droplet', category: 'Grocery', image: 'https://images.unsplash.com/photo-1474979266404-7eaacabc8d0f?auto=format&fit=crop&w=300&q=80', rating: 4.7 },
            { id: 'gro16', name: 'Milk', price: 65, icon: 'fa-glass-water', category: 'Grocery', image: 'https://images.unsplash.com/photo-1550583724-125581fe2188?auto=format&fit=crop&w=300&q=80', rating: 4.8 },
            { id: 'gro18', name: 'Vegetables', price: 60, icon: 'fa-carrot', category: 'Grocery', image: 'https://images.unsplash.com/photo-1566385278333-64478f7e9f3b?auto=format&fit=crop&w=300&q=80', rating: 4.4 }
        ],
        'Pharmacy': [
            { id: 'pha1', name: 'Paracetamol Tablets', price: 40, icon: 'fa-pills', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', rating: 4.8 },
            { id: 'pha2', name: 'Cough Syrup', price: 120, icon: 'fa-prescription-bottle', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1550572859-f97501064619?auto=format&fit=crop&w=300&q=80', rating: 4.2 },
            { id: 'pha7', name: 'Bandages', price: 20, icon: 'fa-band-aid', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80', rating: 4.5 },
            { id: 'pha10', name: 'Thermometer', price: 150, icon: 'fa-temperature-half', category: 'Pharmacy', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80', rating: 4.6 }
        ]
    };

    // Global items state
    let allItems = [];
    let currentCategory = 'All';
    let searchQuery = '';

    // Initialize all items
    const initItems = async () => {
        console.log('--- Initialization Start ---');
        console.log('Selected Shop Type:', vyapaarShopType);

        // Define a broader set of items for simulation if catalogs don't have enough
        // This ensures the simulator always feels "rich" regardless of user's specific shop type chosen
        const simulationPool = [
            ...shopCatalogs['Retail Shop'],
            ...shopCatalogs['Clothing Shop'],
            ...shopCatalogs['Electronics Shop'],
            ...shopCatalogs['Grocery Shop'],
            ...shopCatalogs['Pharmacy']
        ];

        // Remove duplicates by ID
        const uniquePool = Array.from(new Map(simulationPool.map(item => [item.id, item])).values());
        console.log('Unique Simulation Pool:', uniquePool.length, 'items');

        let baseItems = uniquePool;

        let userId = null;
        if (vyapaarUserStr) {
            try {
                const user = JSON.parse(vyapaarUserStr);
                userId = user._id;
                console.log('User ID found:', userId);
            } catch (e) { }
        }

        if (userId) {
            try {
                console.log('Fetching custom items for user:', userId);
                const res = await fetch(`http://localhost:5000/api/items/${userId}?shopType=${vyapaarShopType}`);
                if (res.ok) {
                    const customItems = await res.json();
                    console.log('Custom items fetched:', customItems.length);
                    baseItems = baseItems.concat(customItems.map(ci => ({
                        ...ci,
                        category: ci.category || 'Custom',
                        image: ci.image || 'https://images.unsplash.com/photo-1540914120281-17c2a9916684?auto=format&fit=crop&w=300&q=80',
                        rating: ci.rating || (4 + Math.random().toFixed(1))
                    })));
                }
            } catch (e) { console.error('Failed to fetch custom items', e); }
        }

        allItems = baseItems;
        console.log('Final allItems state:', allItems.length, 'items');
        console.log('First 3 items:', allItems.slice(0, 3));

        renderSections();
        console.log('--- Initialization End ---');
    };

    const renderSections = () => {
        console.log('Rendering sections...', { currentCategory, searchQuery, totalItems: allItems.length });

        // Clear grids
        itemsGrid.innerHTML = '';
        featuredGrid.innerHTML = '';
        offersGrid.innerHTML = '';

        // Global filter: Apply both category and search to create the available items pool
        const filteredPool = allItems.filter(item => {
            const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        console.log('Filtered Pool Size:', filteredPool.length);

        // Render Featured (Top 3 from the filtered pool)
        const featuredItems = filteredPool.slice(0, 3);
        if (featuredItems.length > 0) {
            document.getElementById('featuredSection').style.display = 'block';
            featuredItems.forEach(item => renderItemCard(item, featuredGrid, 'FEATURED'));
        } else {
            document.getElementById('featuredSection').style.display = 'none';
        }

        // Render Offers (Next 3 from the filtered pool)
        const offerItems = filteredPool.slice(3, 6);
        if (offerItems.length > 0) {
            document.getElementById('offersSection').style.display = 'block';
            offerItems.forEach(item => renderItemCard(item, offersGrid, 'OFFER'));
        } else {
            document.getElementById('offersSection').style.display = 'none';
        }

        // Render Full Grid (All items in the filtered pool)
        if (filteredPool.length > 0) {
            filteredPool.forEach(item => renderItemCard(item, itemsGrid));
        } else {
            itemsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--shop-text-muted);">No items found matching your search.</div>';
        }

        // Add "Add Custom" card
        renderAddCard();

        // Re-attach listeners
        attachBuyListeners();
    };

    const renderItemCard = (item, grid, type = 'NORMAL') => {
        const card = document.createElement('div');
        card.className = 'simulator-card';

        let priceHtml = `<div class="current-price">₹${item.price}</div>`;
        let tagHtml = `<div class="card-tag">${item.category}</div>`;
        let badgeHtml = '';

        if (type === 'OFFER') {
            const oldPrice = Math.round(item.price * 1.2);
            priceHtml = `
                <div class="current-price">₹${item.price}</div>
                <div class="old-price">₹${oldPrice}</div>
            `;
            badgeHtml = `<div class="offer-badge">20% OFF</div>`;
        }

        const rating = item.rating || 4.5;
        const ratingHtml = `
            <div class="card-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
        `;

        card.innerHTML = `
            ${badgeHtml}
            <div class="card-img-container">
                <img src="${item.image || 'https://images.unsplash.com/photo-1540914120281-17c2a9916684?auto=format&fit=crop&w=300&q=80'}" alt="${item.name}" class="card-img">
            </div>
            <div class="card-body">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    ${tagHtml}
                    ${ratingHtml}
                </div>
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price-row">
                    ${priceHtml}
                </div>
                <button class="btn-sell btn-buy" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                    <i class="fas fa-cart-shopping"></i> Sell Item
                </button>
            </div>
        `;
        grid.appendChild(card);
    };

    const renderAddCard = () => {
        const addCard = document.createElement('div');
        addCard.className = 'simulator-card';
        addCard.style.border = '2px dashed var(--shop-accent)';
        addCard.style.cursor = 'pointer';
        addCard.innerHTML = `
            <div class="card-img-placeholder" style="background: transparent;">
                <i class="fas fa-plus-circle"></i>
            </div>
            <div class="card-body" style="text-align: center; justify-content: center;">
                <h3 class="card-title" style="color: var(--shop-accent);">Add New Item</h3>
                <p style="font-size: 0.8rem; color: var(--shop-text-muted);">Expand your inventory</p>
            </div>
        `;
        addCard.addEventListener('click', handleAddCustom);
        itemsGrid.appendChild(addCard);
    };

    const handleAddCustom = async () => {
        const itemName = prompt("Enter new item name:");
        if (!itemName) return;
        const itemPrice = parseFloat(prompt("Enter item price (₹):"));
        if (isNaN(itemPrice)) return;

        const newItem = {
            id: 'cust_' + Date.now(),
            name: itemName,
            price: itemPrice,
            icon: 'fa-box',
            category: 'Custom'
        };

        // Save logic (simplified for simulator)
        allItems.push(newItem);
        renderSections();
        showToast(`Added ${itemName} to inventory`);
    };

    const attachBuyListeners = () => {
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', async () => {
                const name = btn.getAttribute('data-name');
                const price = parseFloat(btn.getAttribute('data-price'));

                showToast(`Simulation: Sold ${name} for ₹${price}`);

                // Sync with Dashboard
                const vyapaarUserStr = localStorage.getItem('vyapaarUser');
                if (vyapaarUserStr) {
                    try {
                        const user = JSON.parse(vyapaarUserStr);
                        await fetch('http://localhost:5000/api/sales', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                userId: user._id,
                                shopType: vyapaarShopType,
                                itemName: name,
                                price
                            })
                        });
                    } catch (e) { console.error("Sync error", e); }
                }

                // LocalStorage sync for offline/mock
                const sales = JSON.parse(localStorage.getItem('vyapaarSalesData') || '[]');
                sales.push({ name, price, timestamp: new Date().toISOString() });
                localStorage.setItem('vyapaarSalesData', JSON.stringify(sales));
            });
        });
    };

    // --- Search & Category Events ---

    // Use input, keyup, and change for maximum compatibility
    ['input', 'keyup', 'change'].forEach(eventType => {
        shopSearch.addEventListener(eventType, (e) => {
            searchQuery = e.target.value;
            console.log(`Search triggered via ${eventType}:`, searchQuery);
            renderSections();
        });
    });

    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            console.log('Category clicked:', pill.getAttribute('data-category'));
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Map 'Clothes' from HTML to 'Clothing' in JS if necessary
            let selectedCat = pill.getAttribute('data-category');
            if (selectedCat === 'Clothes') selectedCat = 'Clothing';

            currentCategory = selectedCat;
            renderSections();
        });
    });

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    initItems();
});
