document.addEventListener('DOMContentLoaded', () => {
    const tableTabs = document.getElementById('tableTabs');
    const artistList = document.getElementById('artistList');
    const artistDetail = document.getElementById('artistDetail');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const guideBtn = document.getElementById('guideBtn');
    const guideSection = document.getElementById('guideSection');
    const closeGuideBtn = document.getElementById('closeGuideBtn');

    let tables = [];
    let currentTable = 'all';
    let allArtists = [];

    // Guide section toggle
    guideBtn.addEventListener('click', () => {
        guideSection.classList.remove('hidden');
        artistList.classList.add('hidden');
    });

    closeGuideBtn.addEventListener('click', () => {
        guideSection.classList.add('hidden');
        renderArtistList(currentTable);
    });

    // Load data
    if (typeof tableData !== 'undefined') {
        tables = tableData;
        // Flatten all artists for search
        tables.forEach(table => {
            table.artists.forEach(artist => {
                allArtists.push({
                    ...artist,
                    table_name: table.table_name,
                    fairy1: table.fairy1,
                    fairy2: table.fairy2
                });
            });
        });
        renderTabs();
        renderArtistList(currentTable);
    } else {
        artistList.innerHTML = '<div class="no-data">데이터를 불러올 수 없습니다. (data.js 확인 필요)</div>';
    }

    function renderTabs() {
        tableTabs.innerHTML = '';

        // All tab
        const allTab = createTab('all', '전체');
        tableTabs.appendChild(allTab);

        // Individual table tabs with fairy names
        tables.forEach(table => {
            const label = `${table.table_name}\n${table.fairy1}·${table.fairy2}`;
            const tab = createTab(table.table_name, label);
            tableTabs.appendChild(tab);
        });
    }

    function createTab(value, label) {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.innerHTML = label.replace('\n', '<br><span class="fairy-names">') + '</span>';
        tab.dataset.table = value;

        if (value === currentTable) {
            tab.classList.add('active');
        }

        tab.addEventListener('click', () => {
            currentTable = value;
            updateActiveTab();
            renderArtistList(currentTable);
        });

        return tab;
    }

    function updateActiveTab() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.table === currentTable);
        });
    }

    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderArtistList(currentTable);
            return;
        }

        const filtered = allArtists.filter(artist =>
            (artist.name && artist.name.toLowerCase().includes(query)) ||
            (artist.fairy1 && artist.fairy1.toLowerCase().includes(query)) ||
            (artist.fairy2 && artist.fairy2.toLowerCase().includes(query))
        );
        renderArtistList(null, filtered);
    }

    function renderArtistList(tableFilter, customData = null) {
        artistList.innerHTML = '';
        artistList.classList.remove('hidden');

        let data;
        if (customData) {
            data = customData;
        } else if (tableFilter === 'all') {
            data = allArtists;
        } else {
            const table = tables.find(t => t.table_name === tableFilter);
            if (!table) {
                artistList.innerHTML = '<div class="no-data">해당 테이블을 찾을 수 없습니다.</div>';
                return;
            }
            // Show table info header
            const header = document.createElement('div');
            header.className = 'table-header';
            header.innerHTML = `
                <h3>${table.table_name}</h3>
                <div class="fairy-info">
                    <span>🧚 ${table.fairy1}</span>
                    <span>🧚 ${table.fairy2}</span>
                </div>
            `;
            artistList.appendChild(header);

            data = table.artists.map(a => ({
                ...a,
                table_name: table.table_name,
                fairy1: table.fairy1,
                fairy2: table.fairy2
            }));
        }

        if (!data || data.length === 0) {
            artistList.innerHTML += '<div class="no-data">작가가 없습니다.</div>';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'artist-grid';

        data.forEach(artist => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'artist-card-wrapper';

            const card = document.createElement('div');
            card.className = 'artist-card-mini';
            card.innerHTML = `
                <div class="artist-name">${artist.name}</div>
                <div class="artist-category">${artist.category || '초청 작가'}</div>
            `;

            const detailSection = document.createElement('div');
            detailSection.className = 'artist-detail-inline hidden';
            detailSection.innerHTML = `
                <div class="artist-info">
                    <p><strong>분류:</strong> ${artist.category || '-'}</p>
                    <p><strong>부문:</strong> ${artist.sector || '-'}</p>
                    <p><strong>테이블:</strong> ${artist.table_name}</p>
                    <p><strong>담당 요정:</strong> ${artist.fairy1}, ${artist.fairy2}</p>
                </div>
                <a href="${artist.url}" target="_blank" class="idus-link">작가 홈 방문하기</a>
            `;

            card.addEventListener('click', () => {
                // Close all other details
                document.querySelectorAll('.artist-detail-inline').forEach(detail => {
                    if (detail !== detailSection) {
                        detail.classList.add('hidden');
                        detail.previousElementSibling.classList.remove('expanded');
                    }
                });

                // Toggle current detail
                detailSection.classList.toggle('hidden');
                card.classList.toggle('expanded');
            });

            cardWrapper.appendChild(card);
            cardWrapper.appendChild(detailSection);
            grid.appendChild(cardWrapper);
        });

        artistList.appendChild(grid);
    }
});
