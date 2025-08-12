
        let allData = [];
        let filteredData = [];
        let currentPage = 1;
        const itemsPerPage = 10;
        let loginData = [];
        let isLoggedIn = false;
        let currentUser = null;

        // Load login data from Google Sheets
        async function loadLoginData() {
            try {
                const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT97pIdUGcxpQGKd8gpEbkvLDR-VrKpFYvs8k5K4vVQkGf_Fi28s75teh9uQun1WVFfmpxOwjFBhdsw/pub?gid=0&single=true&output=csv');
                const csvText = await response.text();
                
                // Parse CSV
                const rows = csvText.split('\n').map(row => {
                    const result = [];
                    let current = '';
                    let inQuotes = false;
                    
                    for (let i = 0; i < row.length; i++) {
                        const char = row[i];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            result.push(current.trim());
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    result.push(current.trim());
                    return result;
                }).filter(row => row.some(cell => cell.length > 0));

                if (rows.length === 0) {
                    throw new Error('No login data found');
                }

                const headers = rows[0];
                loginData = rows.slice(1).map(row => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index] || '';
                    });
                    return obj;
                });

                console.log('Login data loaded:', loginData.length, 'users');
                return true;

            } catch (error) {
                console.error('Error loading login data:', error);
                return false;
            }
        }

        // Load data from Google Sheets
        async function loadData() {
            try {
                // Always show loading state when loading data
                document.getElementById('loadingState').classList.remove('hidden');
                document.getElementById('errorState').classList.add('hidden');
                document.getElementById('dataContent').classList.add('hidden');

                const encodedDataUrl = atob('aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvZS8yUEFDWC0xdlE4Tkc0clFtamRMdnBXSzZyWm80VkFTcXpvS1gtQThidGdBMFVMaUZ6OVdGLXlLaEVReDJsV0FsUVM2TG9QSWhXU29BUkswQkxDWlM1di9wdWI/Z2lkPTAmc2luZ2xlPXRydWUmb3V0cHV0PWNzdg==');
                const response = await fetch(encodedDataUrl);
                const csvText = await response.text();
                
                // Parse CSV
                const rows = csvText.split('\n').map(row => {
                    const result = [];
                    let current = '';
                    let inQuotes = false;
                    
                    for (let i = 0; i < row.length; i++) {
                        const char = row[i];
                        if (char === '"') {
                            inQuotes = !inQuotes;
                        } else if (char === ',' && !inQuotes) {
                            result.push(current.trim());
                            current = '';
                        } else {
                            current += char;
                        }
                    }
                    result.push(current.trim());
                    return result;
                }).filter(row => row.some(cell => cell.length > 0));

                if (rows.length === 0) {
                    throw new Error('No data found');
                }

                const headers = rows[0];
                allData = rows.slice(1).map(row => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index] || '';
                    });
                    return obj;
                });

                filteredData = [...allData];
                
                renderTable(headers);
                renderPagination();
                setupFilters(headers);

                // Always update UI elements when data is loaded
                document.getElementById('loadingState').classList.add('hidden');
                document.getElementById('dataContent').classList.remove('hidden');
                
                // Update dashboard stats if data is loaded
                updateDashboardStats();

            } catch (error) {
                console.error('Error loading data:', error);
                // Always show error state when there's an error
                document.getElementById('loadingState').classList.add('hidden');
                document.getElementById('errorState').classList.remove('hidden');
            }
        }



        // Render table
        function renderTable(headers) {
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');

            // Show only first 3 columns + action column
            const displayHeaders = headers.slice(0, 3);

            // Render headers
            tableHead.innerHTML = `
                <tr>
                    ${displayHeaders.map(header => `
                        <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                            ${header}
                        </th>
                    `).join('')}
                    <th class="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-white">
                        Aksi
                    </th>
                </tr>
            `;

            // Render data rows
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageData = filteredData.slice(startIndex, endIndex);
            const isUserAdmin = isAdmin();
            
            tableBody.innerHTML = pageData.map((row, index) => `
                <tr class="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/30' : 'bg-white/50 dark:bg-gray-700/50'}" onclick="toggleRowDetails(${startIndex + index}, this)">
                    ${displayHeaders.map(header => `
                        <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200/50 dark:border-gray-600/50">
                            <div class="max-w-xs truncate" title="${row[header] || '-'}">
                                ${row[header] || '-'}
                            </div>
                        </td>
                    `).join('')}
                    <td class="px-6 py-4 text-center border-b border-gray-200/50 dark:border-gray-600/50">
                        <div class="flex justify-center space-x-2">
                            ${isUserAdmin ? `
                                <button onclick="editRecord(${startIndex + index})" 
                                        class="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button onclick="deleteRecord(${startIndex + index})" 
                                        class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            ` : `
                                <span class="text-gray-400 text-sm">Klik baris untuk detail</span>
                            `}
                        </div>
                    </td>
                </tr>
                <tr id="detail-${startIndex + index}" class="detail-row hidden">
                    <td colspan="${displayHeaders.length + 1}" class="px-6 py-0 bg-blue-50/30 dark:bg-gray-800/30">
                        <div class="detail-content overflow-hidden transition-all duration-300 max-h-0">
                            <div class="py-4">
                                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-blue-200/50 dark:border-gray-600/50">
                                    <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                        <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Detail Informasi
                                    </h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        ${Object.keys(row).map(header => `
                                            <div class="border-b border-gray-200 dark:border-gray-600 pb-3">
                                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">
                                                    ${header}
                                                </label>
                                                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 min-h-[40px] flex items-center">
                                                    <span class="text-gray-900 dark:text-gray-100 break-words">
                                                        ${row[header] || '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="mt-4 flex justify-end">
                                        <button onclick="exportSingleRecord(${startIndex + index})" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                            Export Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Render pagination
        function renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);

            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }

            let paginationHTML = '';

            // Previous button
            paginationHTML += `
                <button onclick="changePage(${currentPage - 1})" 
                        ${currentPage === 1 ? 'disabled' : ''} 
                        class="px-4 py-2 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'} transition-all duration-300">
                    ← Sebelumnya
                </button>
            `;

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (i === currentPage) {
                    paginationHTML += `
                        <button class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                            ${i}
                        </button>
                    `;
                } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    paginationHTML += `
                        <button onclick="changePage(${i})" 
                                class="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition-all duration-300">
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    paginationHTML += '<span class="px-2 text-gray-500">...</span>';
                }
            }

            // Next button
            paginationHTML += `
                <button onclick="changePage(${currentPage + 1})" 
                        ${currentPage === totalPages ? 'disabled' : ''} 
                        class="px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600'} transition-all duration-300">
                    Selanjutnya →
                </button>
            `;

            pagination.innerHTML = paginationHTML;
        }

        // Change page
        function changePage(page) {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderTable(Object.keys(allData[0] || {}));
                renderPagination();
            }
        }

        // Setup filters
        function setupFilters(headers) {
            const searchInput = document.getElementById('searchInput');
            const sortSelect = document.getElementById('sortSelect');

            // Populate sort options
            sortSelect.innerHTML = '<option value="">Urutkan berdasarkan...</option>' +
                headers.map(header => `<option value="${header}">${header}</option>`).join('');

            // Search functionality
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filteredData = allData.filter(row => 
                    Object.values(row).some(value => 
                        value.toString().toLowerCase().includes(searchTerm)
                    )
                );
                currentPage = 1;
                renderTable(headers);
                renderPagination();
            });

            // Sort functionality
            sortSelect.addEventListener('change', (e) => {
                const sortBy = e.target.value;
                if (sortBy) {
                    filteredData.sort((a, b) => {
                        const aVal = a[sortBy] || '';
                        const bVal = b[sortBy] || '';
                        return aVal.localeCompare(bVal);
                    });
                    currentPage = 1;
                    renderTable(headers);
                    renderPagination();
                }
            });
        }

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            const headers = Object.keys(allData[0] || {});
            const csvContent = [
                headers.join(','),
                ...filteredData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data_export.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        });

        // Refresh functionality
        document.getElementById('refreshBtn').addEventListener('click', () => {
            if (!document.getElementById('dataPendudukPage').classList.contains('hidden')) {
                loadData();
            } else {
                // If on dashboard, load data silently and update stats
                loadData().then(() => {
                    updateDashboardStats();
                });
            }
        });

        // Location fields are now text inputs - no dropdown data needed

        // Add data functionality
        document.getElementById('addDataBtn').addEventListener('click', () => {
            if (!isAdmin()) {
                showNotification('Akses ditolak. Hanya admin yang dapat menambah data.', 'error');
                return;
            }
            
            const headers = Object.keys(allData[0] || {});
            
            const addModalContent = document.getElementById('addModalContent');
            addModalContent.innerHTML = `
                <form id="addForm" class="space-y-4">
                    ${headers.map(header => {
                        const headerLower = header.toLowerCase();
                        const isDateField = (headerLower.includes('tanggal') || headerLower.includes('date')) && 
                                          !headerLower.includes('tempat') && !headerLower.includes('place');
                        const isGenderField = headerLower.includes('kelamin') || headerLower.includes('gender') || 
                                            headerLower.includes('jenis');
                        const isReligionField = headerLower.includes('agama') || headerLower.includes('religion');
                        const isNikField = headerLower.includes('nik') || headerLower === 'nik';
                        const isKkField = headerLower.includes('nomor') && (headerLower.includes('kk') || headerLower.includes('kartu keluarga'));
                        const isMaritalField = headerLower.includes('kawin') || headerLower.includes('nikah') || headerLower.includes('marital');
                        const isKkStatusField = headerLower.includes('status') && (headerLower.includes('kk') || headerLower.includes('keluarga'));
                        const isCitizenCategoryField = headerLower.includes('kategori') && headerLower.includes('warga');
                        const isProvinceField = headerLower.includes('provinsi') || headerLower.includes('province');
                        const isKabupatenField = headerLower.includes('kabupaten') || headerLower.includes('regency') || headerLower.includes('kota');
                        const isKecamatanField = headerLower.includes('kecamatan') || headerLower.includes('district');
                        const isEducationField = headerLower.includes('pendidikan') || headerLower.includes('education') || headerLower.includes('sekolah');
                        
                        if (isDateField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="date" 
                                           name="${header}" 
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isGenderField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                            `;
                        } else if (isReligionField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Agama</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Kristen">Kristen</option>
                                        <option value="Katolik">Katolik</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Buddha">Buddha</option>
                                        <option value="Konghucu">Konghucu</option>
                                    </select>
                                </div>
                            `;
                        } else if (isNikField || isKkField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           maxlength="16"
                                           pattern="[0-9]{16}"
                                           placeholder="Masukkan 16 digit angka"
                                           oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 16)"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Harus 16 digit angka</p>
                                </div>
                            `;
                        } else if (isMaritalField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Status Perkawinan</option>
                                        <option value="Belum Menikah">Belum Menikah</option>
                                        <option value="Menikah">Menikah</option>
                                        <option value="Cerai Hidup">Cerai Hidup</option>
                                        <option value="Cerai Mati">Cerai Mati</option>
                                    </select>
                                </div>
                            `;
                        } else if (isKkStatusField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Status dalam KK</option>
                                        <option value="Kepala Keluarga">Kepala Keluarga</option>
                                        <option value="Istri">Istri</option>
                                        <option value="Anak">Anak</option>
                                        <option value="Menantu">Menantu</option>
                                        <option value="Cucu">Cucu</option>
                                        <option value="Orang Tua">Orang Tua</option>
                                        <option value="Mertua">Mertua</option>
                                        <option value="Famili Lain">Famili Lain</option>
                                        <option value="Pembantu">Pembantu</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            `;
                        } else if (isCitizenCategoryField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Kategori Warga</option>
                                        <option value="Dusun 1">Dusun 1</option>
                                        <option value="Dusun 2">Dusun 2</option>
                                        <option value="Dusun 3">Dusun 3</option>
                                        <option value="Dusun 4">Dusun 4</option>
                                    </select>
                                </div>
                            `;
                        } else if (isProvinceField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           placeholder="Masukkan nama provinsi"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isKabupatenField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           placeholder="Masukkan nama kabupaten/kota"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isKecamatanField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           placeholder="Masukkan nama kecamatan"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isEducationField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Tingkat Pendidikan</option>
                                        <option value="Tidak Sekolah">Tidak Sekolah</option>
                                        <option value="Tidak Tamat SD">Tidak Tamat SD</option>
                                        <option value="SD/Sederajat">SD/Sederajat</option>
                                        <option value="SMP/Sederajat">SMP/Sederajat</option>
                                        <option value="SMA/Sederajat">SMA/Sederajat</option>
                                        <option value="SMK/Sederajat">SMK/Sederajat</option>
                                        <option value="D1">D1</option>
                                        <option value="D2">D2</option>
                                        <option value="D3">D3</option>
                                        <option value="D4/S1">D4/S1</option>
                                        <option value="S2">S2</option>
                                        <option value="S3">S3</option>
                                    </select>
                                </div>
                            `;
                        } else {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        }
                    }).join('')}
                </form>
            `;
            
            // Location fields are now text inputs - no event listeners needed
            
            document.getElementById('addModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Modal functionality
        let currentDetailIndex = -1;
        let currentEditIndex = -1;
        let currentDeleteIndex = -1;

        function showDetails(index) {
            currentDetailIndex = index;
            const record = filteredData[index];
            const headers = Object.keys(allData[0] || {});
            
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="space-y-4">
                    ${headers.map(header => `
                        <div class="border-b border-gray-200 pb-4">
                            <label class="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                ${header}
                            </label>
                            <div class="bg-gray-50 rounded-lg p-3 min-h-[40px] flex items-center">
                                <span class="text-gray-900 break-words">
                                    ${record[header] || '-'}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('detailModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('detailModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
            currentDetailIndex = -1;
        }

        function exportSingleRecord(index = null) {
            const recordIndex = index !== null ? index : currentDetailIndex;
            if (recordIndex === -1) return;
            
            const record = filteredData[recordIndex];
            const headers = Object.keys(allData[0] || {});
            
            const csvContent = [
                headers.join(','),
                headers.map(header => `"${record[header] || ''}"`).join(',')
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `record_${recordIndex + 1}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
        }

        // Toggle row details with smooth animation
        function toggleRowDetails(index, rowElement) {
            // Prevent event bubbling for action buttons
            if (event.target.closest('button')) {
                return;
            }
            
            const detailRow = document.getElementById(`detail-${index}`);
            const detailContent = detailRow.querySelector('.detail-content');
            const isCurrentlyOpen = !detailRow.classList.contains('hidden');
            
            // Close all other open detail rows
            document.querySelectorAll('.detail-row').forEach(row => {
                if (row !== detailRow && !row.classList.contains('hidden')) {
                    const content = row.querySelector('.detail-content');
                    content.style.maxHeight = '0px';
                    setTimeout(() => {
                        row.classList.add('hidden');
                    }, 300);
                }
            });
            
            if (isCurrentlyOpen) {
                // Close this row
                detailContent.style.maxHeight = '0px';
                setTimeout(() => {
                    detailRow.classList.add('hidden');
                }, 300);
            } else {
                // Open this row
                detailRow.classList.remove('hidden');
                
                // Calculate the height needed
                const tempDiv = detailContent.cloneNode(true);
                tempDiv.style.maxHeight = 'none';
                tempDiv.style.position = 'absolute';
                tempDiv.style.visibility = 'hidden';
                document.body.appendChild(tempDiv);
                const height = tempDiv.scrollHeight;
                document.body.removeChild(tempDiv);
                
                // Animate to full height
                setTimeout(() => {
                    detailContent.style.maxHeight = height + 'px';
                }, 10);
            }
        }

        // Edit functionality
        function editRecord(index) {
            if (!isAdmin()) {
                showNotification('Akses ditolak. Hanya admin yang dapat mengedit data.', 'error');
                return;
            }
            
            currentEditIndex = index;
            const record = filteredData[index];
            const headers = Object.keys(allData[0] || {});
            
            const editModalContent = document.getElementById('editModalContent');
            editModalContent.innerHTML = `
                <form id="editForm" class="space-y-4">
                    ${headers.map(header => {
                        const headerLower = header.toLowerCase();
                        const isDateField = (headerLower.includes('tanggal') || headerLower.includes('date')) && 
                                          !headerLower.includes('tempat') && !headerLower.includes('place');
                        const isGenderField = headerLower.includes('kelamin') || headerLower.includes('gender') || 
                                            headerLower.includes('jenis');
                        const isReligionField = headerLower.includes('agama') || headerLower.includes('religion');
                        const isNikField = headerLower.includes('nik') || headerLower === 'nik';
                        const isKkField = headerLower.includes('nomor') && (headerLower.includes('kk') || headerLower.includes('kartu keluarga'));
                        const isMaritalField = headerLower.includes('kawin') || headerLower.includes('nikah') || headerLower.includes('marital');
                        const isKkStatusField = headerLower.includes('status') && (headerLower.includes('kk') || headerLower.includes('keluarga'));
                        const isCitizenCategoryField = headerLower.includes('kategori') && headerLower.includes('warga');
                        const isProvinceField = headerLower.includes('provinsi') || headerLower.includes('province');
                        const isKabupatenField = headerLower.includes('kabupaten') || headerLower.includes('regency') || headerLower.includes('kota');
                        const isKecamatanField = headerLower.includes('kecamatan') || headerLower.includes('district');
                        const isEducationField = headerLower.includes('pendidikan') || headerLower.includes('education') || headerLower.includes('sekolah');
                        
                        if (isDateField) {
                            // Convert date format if needed (from DD/MM/YYYY to YYYY-MM-DD)
                            let dateValue = record[header] || '';
                            if (dateValue && dateValue.includes('/')) {
                                const parts = dateValue.split('/');
                                if (parts.length === 3) {
                                    dateValue = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                                }
                            }
                            
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="date" 
                                           name="${header}" 
                                           value="${dateValue}"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isGenderField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki" ${(record[header] || '').toLowerCase().includes('laki') ? 'selected' : ''}>Laki-laki</option>
                                        <option value="Perempuan" ${(record[header] || '').toLowerCase().includes('perempuan') ? 'selected' : ''}>Perempuan</option>
                                    </select>
                                </div>
                            `;
                        } else if (isReligionField) {
                            const currentReligion = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Agama</option>
                                        <option value="Islam" ${currentReligion === 'Islam' ? 'selected' : ''}>Islam</option>
                                        <option value="Kristen" ${currentReligion === 'Kristen' ? 'selected' : ''}>Kristen</option>
                                        <option value="Katolik" ${currentReligion === 'Katolik' ? 'selected' : ''}>Katolik</option>
                                        <option value="Hindu" ${currentReligion === 'Hindu' ? 'selected' : ''}>Hindu</option>
                                        <option value="Buddha" ${currentReligion === 'Buddha' ? 'selected' : ''}>Buddha</option>
                                        <option value="Konghucu" ${currentReligion === 'Konghucu' ? 'selected' : ''}>Konghucu</option>
                                    </select>
                                </div>
                            `;
                        } else if (isNikField || isKkField) {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           value="${record[header] || ''}"
                                           maxlength="16"
                                           pattern="[0-9]{16}"
                                           placeholder="Masukkan 16 digit angka"
                                           oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 16)"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Harus 16 digit angka</p>
                                </div>
                            `;
                        } else if (isMaritalField) {
                            const currentMarital = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Status Perkawinan</option>
                                        <option value="Belum Menikah" ${currentMarital === 'Belum Menikah' ? 'selected' : ''}>Belum Menikah</option>
                                        <option value="Menikah" ${currentMarital === 'Menikah' ? 'selected' : ''}>Menikah</option>
                                        <option value="Cerai Hidup" ${currentMarital === 'Cerai Hidup' ? 'selected' : ''}>Cerai Hidup</option>
                                        <option value="Cerai Mati" ${currentMarital === 'Cerai Mati' ? 'selected' : ''}>Cerai Mati</option>
                                    </select>
                                </div>
                            `;
                        } else if (isKkStatusField) {
                            const currentKkStatus = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Status dalam KK</option>
                                        <option value="Kepala Keluarga" ${currentKkStatus === 'Kepala Keluarga' ? 'selected' : ''}>Kepala Keluarga</option>
                                        <option value="Istri" ${currentKkStatus === 'Istri' ? 'selected' : ''}>Istri</option>
                                        <option value="Anak" ${currentKkStatus === 'Anak' ? 'selected' : ''}>Anak</option>
                                        <option value="Menantu" ${currentKkStatus === 'Menantu' ? 'selected' : ''}>Menantu</option>
                                        <option value="Cucu" ${currentKkStatus === 'Cucu' ? 'selected' : ''}>Cucu</option>
                                        <option value="Orang Tua" ${currentKkStatus === 'Orang Tua' ? 'selected' : ''}>Orang Tua</option>
                                        <option value="Mertua" ${currentKkStatus === 'Mertua' ? 'selected' : ''}>Mertua</option>
                                        <option value="Famili Lain" ${currentKkStatus === 'Famili Lain' ? 'selected' : ''}>Famili Lain</option>
                                        <option value="Pembantu" ${currentKkStatus === 'Pembantu' ? 'selected' : ''}>Pembantu</option>
                                        <option value="Lainnya" ${currentKkStatus === 'Lainnya' ? 'selected' : ''}>Lainnya</option>
                                    </select>
                                </div>
                            `;
                        } else if (isCitizenCategoryField) {
                            const currentCategory = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Kategori Warga</option>
                                        <option value="Dusun 1" ${currentCategory === 'Dusun 1' ? 'selected' : ''}>Dusun 1</option>
                                        <option value="Dusun 2" ${currentCategory === 'Dusun 2' ? 'selected' : ''}>Dusun 2</option>
                                        <option value="Dusun 3" ${currentCategory === 'Dusun 3' ? 'selected' : ''}>Dusun 3</option>
                                        <option value="Dusun 4" ${currentCategory === 'Dusun 4' ? 'selected' : ''}>Dusun 4</option>
                                    </select>
                                </div>
                            `;
                        } else if (isProvinceField) {
                            const currentProvince = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           value="${currentProvince}"
                                           placeholder="Masukkan nama provinsi"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isKabupatenField) {
                            const currentKabupaten = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           value="${currentKabupaten}"
                                           placeholder="Masukkan nama kabupaten/kota"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isKecamatanField) {
                            const currentKecamatan = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           value="${currentKecamatan}"
                                           placeholder="Masukkan nama kecamatan"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        } else if (isEducationField) {
                            const currentEducation = record[header] || '';
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <select name="${header}" 
                                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                        <option value="">Pilih Tingkat Pendidikan</option>
                                        <option value="Tidak Sekolah" ${currentEducation === 'Tidak Sekolah' ? 'selected' : ''}>Tidak Sekolah</option>
                                        <option value="Tidak Tamat SD" ${currentEducation === 'Tidak Tamat SD' ? 'selected' : ''}>Tidak Tamat SD</option>
                                        <option value="SD/Sederajat" ${currentEducation === 'SD/Sederajat' ? 'selected' : ''}>SD/Sederajat</option>
                                        <option value="SMP/Sederajat" ${currentEducation === 'SMP/Sederajat' ? 'selected' : ''}>SMP/Sederajat</option>
                                        <option value="SMA/Sederajat" ${currentEducation === 'SMA/Sederajat' ? 'selected' : ''}>SMA/Sederajat</option>
                                        <option value="SMK/Sederajat" ${currentEducation === 'SMK/Sederajat' ? 'selected' : ''}>SMK/Sederajat</option>
                                        <option value="D1" ${currentEducation === 'D1' ? 'selected' : ''}>D1</option>
                                        <option value="D2" ${currentEducation === 'D2' ? 'selected' : ''}>D2</option>
                                        <option value="D3" ${currentEducation === 'D3' ? 'selected' : ''}>D3</option>
                                        <option value="D4/S1" ${currentEducation === 'D4/S1' ? 'selected' : ''}>D4/S1</option>
                                        <option value="S2" ${currentEducation === 'S2' ? 'selected' : ''}>S2</option>
                                        <option value="S3" ${currentEducation === 'S3' ? 'selected' : ''}>S3</option>
                                    </select>
                                </div>
                            `;
                        } else {
                            return `
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        ${header}
                                    </label>
                                    <input type="text" 
                                           name="${header}" 
                                           value="${record[header] || ''}"
                                           class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300">
                                </div>
                            `;
                        }
                    }).join('')}
                </form>
            `;
            
            // Location fields are now text inputs - no event listeners needed
            
            document.getElementById('editModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
            currentEditIndex = -1;
        }

        async function saveEdit() {
            if (currentEditIndex === -1) return;
            
            // Validate NIK and KK fields
            const form = document.getElementById('editForm');
            const formData = new FormData(form);
            
            for (let [key, value] of formData.entries()) {
                const keyLower = key.toLowerCase();
                const isNikField = keyLower.includes('nik') || keyLower === 'nik';
                const isKkField = keyLower.includes('nomor') && (keyLower.includes('kk') || keyLower.includes('kartu keluarga'));
                
                if ((isNikField || isKkField) && value) {
                    if (!/^\d{16}$/.test(value)) {
                        showNotification(`${key} harus berisi tepat 16 digit angka`, 'error');
                        return;
                    }
                }
            }
            
            const saveBtn = document.getElementById('saveEditBtn');
            const originalText = saveBtn.innerHTML;
            
            try {
                saveBtn.innerHTML = `
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menyimpan...</span>
                `;
                saveBtn.disabled = true;

                const form = document.getElementById('editForm');
                const formData = new FormData(form);
                
                // Create URL-encoded data for better compatibility
                const params = new URLSearchParams();
                
                // Add all form fields
                for (let [key, value] of formData.entries()) {
                    params.append(key, value);
                }
                
                // Add action and rowIndex for edit operation
                params.append('action', 'edit');
                params.append('rowIndex', currentEditIndex + 2);

                console.log('Sending edit data:', Object.fromEntries(params));

                // Try with URL-encoded data first
                const encodedScriptUrl = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4Y0pELVNZa1M3akdLRVVOQ0xRMGlzZ1V6SzRISXc5Q1c0SlhPTW5fMlJMaGIwSEJ2TVE4akU5Njh2Tk52R3AyMHVMUS9leGVj');
                const response = await fetch(encodedScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString()
                });

                // Update local data with form values
                const updatedData = {};
                for (let [key, value] of formData.entries()) {
                    updatedData[key] = value;
                }

                // Update local arrays
                filteredData[currentEditIndex] = updatedData;
                const originalIndex = allData.findIndex(item => 
                    Object.keys(item).every(key => item[key] === filteredData[currentEditIndex][key])
                );
                if (originalIndex !== -1) {
                    allData[originalIndex] = updatedData;
                }

                // Refresh table
                renderTable(Object.keys(allData[0] || {}));
                
                closeEditModal();
                
                // Show success message
                showNotification('Data berhasil diperbarui!', 'success');

                // Refresh data from server after 3 seconds to ensure sync
                setTimeout(() => {
                    loadData();
                }, 3000);

            } catch (error) {
                console.error('Error updating data:', error);
                showNotification('Gagal memperbarui data. Silakan coba lagi.', 'error');
            } finally {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
        }

        // Delete functionality
        function deleteRecord(index) {
            if (!isAdmin()) {
                showNotification('Akses ditolak. Hanya admin yang dapat menghapus data.', 'error');
                return;
            }
            
            currentDeleteIndex = index;
            const record = filteredData[index];
            const headers = Object.keys(allData[0] || {});
            
            const deletePreview = document.getElementById('deletePreview');
            deletePreview.innerHTML = `
                <div class="space-y-2">
                    ${headers.slice(0, 3).map(header => `
                        <div class="flex justify-between">
                            <span class="font-medium text-gray-600">${header}:</span>
                            <span class="text-gray-900">${record[header] || '-'}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('deleteModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
            currentDeleteIndex = -1;
        }

        async function confirmDelete() {
            if (currentDeleteIndex === -1) return;
            
            const deleteBtn = document.getElementById('confirmDeleteBtn');
            const originalText = deleteBtn.innerHTML;
            
            try {
                deleteBtn.innerHTML = `
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menghapus...</span>
                `;
                deleteBtn.disabled = true;

                const record = filteredData[currentDeleteIndex];
                
                // Create URL-encoded data for better compatibility
                const params = new URLSearchParams();
                params.append('action', 'delete');
                params.append('rowIndex', currentDeleteIndex + 2);

                console.log('Sending delete data:', Object.fromEntries(params));

                const encodedScriptUrl = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4Y0pELVNZa1M3akdLRVVOQ0xRMGlzZ1V6SzRISXc5Q1c0SlhPTW5fMlJMaGIwSEJ2TVE4akU5Njh2Tk52R3AyMHVMUS9leGVj');
                const response = await fetch(encodedScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString()
                });

                // Remove from local data
                filteredData.splice(currentDeleteIndex, 1);
                const originalIndex = allData.findIndex(item => 
                    Object.keys(item).every(key => item[key] === record[key])
                );
                if (originalIndex !== -1) {
                    allData.splice(originalIndex, 1);
                }

                // Refresh table
                renderTable(Object.keys(allData[0] || {}));
                renderPagination();
                updateDashboardStats();
                
                closeDeleteModal();
                
                // Show success message
                showNotification('Data berhasil dihapus!', 'success');

                // Refresh data from server after 3 seconds to ensure sync
                setTimeout(() => {
                    loadData();
                }, 3000);

            } catch (error) {
                console.error('Error deleting data:', error);
                showNotification('Gagal menghapus data. Silakan coba lagi.', 'error');
            } finally {
                deleteBtn.innerHTML = originalText;
                deleteBtn.disabled = false;
            }
        }

        // Add data modal functions
        function closeAddModal() {
            document.getElementById('addModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        async function saveNewData() {
            // Validate NIK and KK fields
            const form = document.getElementById('addForm');
            const formData = new FormData(form);
            
            for (let [key, value] of formData.entries()) {
                const keyLower = key.toLowerCase();
                const isNikField = keyLower.includes('nik') || keyLower === 'nik';
                const isKkField = keyLower.includes('nomor') && (keyLower.includes('kk') || keyLower.includes('kartu keluarga'));
                
                if ((isNikField || isKkField) && value) {
                    if (!/^\d{16}$/.test(value)) {
                        showNotification(`${key} harus berisi tepat 16 digit angka`, 'error');
                        return;
                    }
                }
            }
            
            const saveBtn = document.getElementById('saveNewBtn');
            const originalText = saveBtn.innerHTML;
            
            try {
                saveBtn.innerHTML = `
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menyimpan...</span>
                `;
                saveBtn.disabled = true;

                const form = document.getElementById('addForm');
                const formData = new FormData(form);
                
                // Create URL-encoded data for better compatibility
                const params = new URLSearchParams();
                
                // Add all form fields
                for (let [key, value] of formData.entries()) {
                    params.append(key, value);
                }
                
                // Add action for add operation
                params.append('action', 'add');

                console.log('Sending add data:', Object.fromEntries(params));

                // Try with URL-encoded data first
                const encodedScriptUrl = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4Y0pELVNZa1M3akdLRVVOQ0xRMGlzZ1V6SzRISXc5Q1c0SlhPTW5fMlJMaGIwSEJ2TVE4akU5Njh2Tk52R3AyMHVMUS9leGVj');
                const response = await fetch(encodedScriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params.toString()
                });

                // Add to local data
                const newData = {};
                for (let [key, value] of formData.entries()) {
                    newData[key] = value;
                }

                allData.push(newData);
                filteredData.push(newData);

                // Refresh table
                renderTable(Object.keys(allData[0] || {}));
                renderPagination();
                updateDashboardStats();
                
                closeAddModal();
                
                // Show success message
                showNotification('Data baru berhasil ditambahkan!', 'success');

                // Refresh data from server after 3 seconds to ensure sync
                setTimeout(() => {
                    loadData();
                }, 3000);

            } catch (error) {
                console.error('Error adding data:', error);
                showNotification('Gagal menambahkan data. Silakan coba lagi.', 'error');
            } finally {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium animate-fade-in ${
                type === 'success' ? 'bg-green-500' : 
                type === 'error' ? 'bg-red-500' : 
                'bg-blue-500'
            }`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Close modal when clicking outside
        document.getElementById('detailModal').addEventListener('click', (e) => {
            if (e.target.id === 'detailModal') {
                closeModal();
            }
        });

        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                closeEditModal();
            }
        });

        document.getElementById('addModal').addEventListener('click', (e) => {
            if (e.target.id === 'addModal') {
                closeAddModal();
            }
        });

        document.getElementById('deleteModal').addEventListener('click', (e) => {
            if (e.target.id === 'deleteModal') {
                closeDeleteModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!document.getElementById('detailModal').classList.contains('hidden')) {
                    closeModal();
                } else if (!document.getElementById('editModal').classList.contains('hidden')) {
                    closeEditModal();
                } else if (!document.getElementById('addModal').classList.contains('hidden')) {
                    closeAddModal();
                } else if (!document.getElementById('deleteModal').classList.contains('hidden')) {
                    closeDeleteModal();
                }
            }
        });

        // Navigation functions
        function showDashboard() {
            document.getElementById('dashboardPage').classList.remove('hidden');
            document.getElementById('dataPendudukPage').classList.add('hidden');
            
            // Update desktop navigation buttons
            document.getElementById('dashboardBtn').className = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm';
            document.getElementById('dataPendudukBtn').className = 'bg-gray-500 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm';
            
            // Update mobile navigation buttons
            document.getElementById('dashboardBtnMobile').className = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md text-sm text-left';
            document.getElementById('dataPendudukBtnMobile').className = 'bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 shadow-md text-sm text-left';
            
            // Update dashboard stats
            updateDashboardStats();
        }

        function showDataPenduduk() {
            document.getElementById('dashboardPage').classList.add('hidden');
            document.getElementById('dataPendudukPage').classList.remove('hidden');
            
            // Update desktop navigation buttons
            document.getElementById('dashboardBtn').className = 'bg-gray-500 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm';
            document.getElementById('dataPendudukBtn').className = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm';
            
            // Update mobile navigation buttons
            document.getElementById('dashboardBtnMobile').className = 'bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 shadow-md text-sm text-left';
            document.getElementById('dataPendudukBtnMobile').className = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md text-sm text-left';
            
            // Load data if not already loaded
            if (allData.length === 0) {
                loadData();
            }
        }

        // Check user role/position
        function isAdmin() {
            if (!isLoggedIn || !currentUser) return false;
            const position = (currentUser.position || currentUser.Position || currentUser.role || currentUser.Role || '').toLowerCase();
            return position === 'admin' || position === 'administrator';
        }

        // Update UI based on user role
        function updateUIForRole() {
            const isUserAdmin = isAdmin();
            
            // Show/hide add button - only show if logged in AND admin
            const addBtn = document.getElementById('addDataBtn');
            if (addBtn) {
                addBtn.style.display = (isLoggedIn && isUserAdmin) ? 'flex' : 'none';
            }
            
            // Re-render table to show/hide action buttons
            if (allData.length > 0) {
                renderTable(Object.keys(allData[0] || {}));
            }
        }

        // Update dashboard statistics
        function updateDashboardStats() {
            if (allData.length === 0) return;
            
            const total = allData.length;
            let lakiLaki = 0;
            let perempuan = 0;
            let usiaProduktif = 0;
            
            allData.forEach(row => {
                // Count by gender (assuming there's a gender column)
                const gender = (row['Jenis Kelamin'] || row['Gender'] || '').toLowerCase();
                if (gender.includes('laki') || gender.includes('male') || gender === 'l') {
                    lakiLaki++;
                } else if (gender.includes('perempuan') || gender.includes('female') || gender === 'p') {
                    perempuan++;
                }
                
                // Count productive age (15-64 years old)
                const age = parseInt(row['Umur'] || row['Usia'] || row['Age'] || 0);
                if (age >= 15 && age <= 64) {
                    usiaProduktif++;
                }
            });
            
            document.getElementById('totalPenduduk').textContent = total.toLocaleString();
            document.getElementById('totalLakiLaki').textContent = lakiLaki.toLocaleString();
            document.getElementById('totalPerempuan').textContent = perempuan.toLocaleString();
            document.getElementById('usiaProduktif').textContent = usiaProduktif.toLocaleString();
            
            // Update last update time
            updateLastUpdateTime();
        }

        // Update last update time
        function updateLastUpdateTime() {
            const now = new Date();
            const timeString = now.toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            const lastUpdateElement = document.getElementById('lastUpdateTime');
            if (lastUpdateElement) {
                lastUpdateElement.textContent = timeString;
            }
        }

        // Login modal functions
        async function showLoginModal() {
            document.getElementById('loginModal').classList.remove('hidden');
            document.getElementById('loginLoadingState').classList.remove('hidden');
            document.getElementById('loginFormContainer').classList.add('hidden');
            document.body.style.overflow = 'hidden';
            
            // Load login data
            const success = await loadLoginData();
            
            document.getElementById('loginLoadingState').classList.add('hidden');
            if (success) {
                document.getElementById('loginFormContainer').classList.remove('hidden');
            } else {
                showLoginStatus('Gagal memuat data login. Silakan coba lagi.', 'error');
                document.getElementById('loginFormContainer').classList.remove('hidden');
            }
        }

        function closeLoginModal() {
            document.getElementById('loginModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Reset form
            document.getElementById('loginForm').reset();
            document.getElementById('loginStatus').classList.add('hidden');
        }

        function showLoginStatus(message, type = 'info') {
            const statusDiv = document.getElementById('loginStatus');
            statusDiv.className = `mt-4 text-center p-3 rounded-lg ${
                type === 'success' ? 'bg-green-100 text-green-700' : 
                type === 'error' ? 'bg-red-100 text-red-700' : 
                'bg-blue-100 text-blue-700'
            }`;
            statusDiv.textContent = message;
            statusDiv.classList.remove('hidden');
        }

        async function performLogin() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const submitBtn = document.getElementById('loginSubmitBtn');
            const originalText = submitBtn.innerHTML;
            
            if (!username || !password) {
                showLoginStatus('Harap masukkan username dan password', 'error');
                return;
            }
            
            try {
                submitBtn.innerHTML = `
                    <svg class="w-5 h-5 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                `;
                submitBtn.disabled = true;
                
                // Check credentials against loaded data
                const user = loginData.find(user => {
                    const userUsername = (user.username || user.Username || user.email || user.Email || '').toLowerCase();
                    const userPassword = user.password || user.Password || '';
                    return userUsername === username.toLowerCase() && userPassword === password;
                });
                
                if (user) {
                    isLoggedIn = true;
                    currentUser = user;
                    
                    // Update UI for logged in state
                    updateLoginUI();
                    updateUIForRole();
                    
                    const userRole = (user.position || user.Position || user.role || user.Role || 'User');
                    showLoginStatus(`Login berhasil! Selamat datang sebagai ${userRole}.`, 'success');
                    
                    setTimeout(() => {
                        closeLoginModal();
                        showNotification(`Selamat datang, ${user.name || user.Name || username}! (${userRole})`, 'success');
                    }, 1500);
                    
                } else {
                    showLoginStatus('Username atau password salah', 'error');
                }
                
            } catch (error) {
                console.error('Login error:', error);
                showLoginStatus('Terjadi kesalahan saat login', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }

        function updateLoginUI() {
            const loginBtn = document.getElementById('loginBtn');
            const dashboardTitle = document.getElementById('dashboardTitle');
            
            if (isLoggedIn && currentUser) {
                const userRole = (currentUser.position || currentUser.Position || currentUser.role || currentUser.Role || 'User');
                const isUserAdmin = userRole.toLowerCase() === 'admin' || userRole.toLowerCase() === 'administrator';
                const userName = currentUser.name || currentUser.Name || currentUser.username || currentUser.Username || 'User';
                
                // Update dashboard title
                dashboardTitle.textContent = `Welcome ${userName}`;
                
                loginBtn.innerHTML = `
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                `;
                loginBtn.onclick = logout;
                loginBtn.className = 'bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm flex items-center';
            } else {
                // Reset to default when not logged in
                dashboardTitle.textContent = 'Welcome User';
                
                loginBtn.innerHTML = 'Login';
                loginBtn.onclick = showLoginModal;
                loginBtn.className = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm';
            }
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            updateLoginUI();
            updateUIForRole();
            showNotification('Anda telah logout', 'info');
        }

        // Close login modal when clicking outside
        document.getElementById('loginModal').addEventListener('click', (e) => {
            if (e.target.id === 'loginModal') {
                closeLoginModal();
            }
        });

        // Handle Enter key in login form
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !document.getElementById('loginModal').classList.contains('hidden')) {
                performLogin();
            }
        });

        // Mobile menu functions
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('hidden');
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.add('hidden');
        }

        // Theme toggle functionality
        let isDarkMode = localStorage.getItem('darkMode') === 'true';

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            localStorage.setItem('darkMode', isDarkMode);
            updateTheme();
        }

        function updateTheme() {
            const html = document.documentElement;
            const sunIcon = document.getElementById('sunIcon');
            const moonIcon = document.getElementById('moonIcon');
            const sunIconMobile = document.getElementById('sunIconMobile');
            const moonIconMobile = document.getElementById('moonIconMobile');
            const themeTextMobile = document.getElementById('themeTextMobile');
            
            if (isDarkMode) {
                html.classList.add('dark');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
                sunIconMobile.classList.add('hidden');
                moonIconMobile.classList.remove('hidden');
                themeTextMobile.textContent = 'Mode Terang';
            } else {
                html.classList.remove('dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
                sunIconMobile.classList.remove('hidden');
                moonIconMobile.classList.add('hidden');
                themeTextMobile.textContent = 'Mode Gelap';
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize theme
            updateTheme();
            
            // Set initial last update time
            updateLastUpdateTime();
            
            // Load data on page load
            loadData();
            
            // Show data content immediately if we're on data penduduk page
            if (!document.getElementById('dataPendudukPage').classList.contains('hidden')) {
                document.getElementById('loadingState').classList.remove('hidden');
                document.getElementById('errorState').classList.add('hidden');
                document.getElementById('dataContent').classList.add('hidden');
            }

            // Theme toggle buttons
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);
            document.getElementById('themeToggleMobile').addEventListener('click', () => {
                toggleTheme();
                closeMobileMenu();
            });

            // Mobile menu toggle
            document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
            
            // Mobile refresh button
            document.getElementById('refreshBtnMobile').addEventListener('click', () => {
                if (!document.getElementById('dataPendudukPage').classList.contains('hidden')) {
                    loadData();
                } else {
                    loadData().then(() => {
                        updateDashboardStats();
                    });
                }
                closeMobileMenu();
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    closeMobileMenu();
                }
            });
        });
