// === DATOS INICIALES SEMILLA ===
const INITIAL_VEHICLES = [
  { id: 'TSJ-01', name: 'Camioneta TSJ-01', type: 'Camioneta', km: 15000, fuel: 75, status: 'Disponible' },
  { id: 'TSJ-02', name: 'Sedán TSJ-02', type: 'Sedán', km: 22000, fuel: 50, status: 'Disponible' },
  { id: 'TSJ-03', name: 'SUV TSJ-03', type: 'SUV', km: 18260, fuel: 60, status: 'En Uso' },
  { id: 'TSJ-04', name: 'Camioneta TSJ-04', type: 'Camioneta', km: 12000, fuel: 80, status: 'Disponible' },
  { id: 'TSJ-05', name: 'Sedán TSJ-05', type: 'Sedán', km: 25000, fuel: 40, status: 'Disponible' },
  { id: 'TSJ-06', name: 'SUV TSJ-06', type: 'SUV', km: 31200, fuel: 90, status: 'En Uso' },
  { id: 'TSJ-07', name: 'Camioneta TSJ-07', type: 'Camioneta', km: 8500, fuel: 95, status: 'Mantenimiento' },
  { id: 'TSJ-08', name: 'SUV TSJ-08', type: 'SUV', km: 14000, fuel: 85, status: 'Disponible' },
  { id: 'TSJ-09', name: 'Sedán TSJ-09', type: 'Sedán', km: 21000, fuel: 55, status: 'Disponible' },
  { id: 'TSJ-10', name: 'SUV TSJ-10', type: 'SUV', km: 42000, fuel: 30, status: 'En Uso' },
  { id: 'TSJ-11', name: 'Camioneta TSJ-11', type: 'Camioneta', km: 16500, fuel: 70, status: 'Disponible' },
  { id: 'TSJ-12', name: 'Sedán TSJ-12', type: 'Sedán', km: 19800, fuel: 65, status: 'Disponible' },
  { id: 'TSJ-13', name: 'SUV TSJ-13', type: 'SUV', km: 27400, fuel: 45, status: 'En Uso' },
  { id: 'TSJ-14', name: 'Camioneta TSJ-14', type: 'Camioneta', km: 34000, fuel: 20, status: 'Mantenimiento' },
  { id: 'TSJ-15', name: 'Sedán TSJ-15', type: 'Sedán', km: 11000, fuel: 100, status: 'Disponible' },
  { id: 'TSJ-16', name: 'SUV TSJ-16', type: 'SUV', km: 15300, fuel: 85, status: 'Disponible' },
  { id: 'TSJ-17', name: 'Camioneta TSJ-17', type: 'Camioneta', km: 29900, fuel: 15, status: 'En Uso' }
];

const INITIAL_LOGS = [
  {
    id: 'LOG-001',
    fecha: '2026-05-20',
    vehiculoId: 'TSJ-03',
    vehiculoName: 'SUV TSJ-03',
    kmInicial: 18260,
    combustible: 60,
    estado: 'Pendiente',
    usuario: 'admin@correo.com',
    destino: 'Tribunal Central, Oficina Norte',
    motivo: 'Traslado de documentos confidenciales y expedientes de juzgado.'
  },
  {
    id: 'LOG-002',
    fecha: '2026-05-19',
    vehiculoId: 'TSJ-01',
    vehiculoName: 'Camioneta TSJ-01',
    kmInicial: 14880,
    combustible: 75,
    estado: 'Correcto',
    usuario: 'admin@correo.com',
    destino: 'Juzgado Municipal',
    motivo: 'Inspección de rutina a las instalaciones periféricas.'
  }
];

const INITIAL_RESERVATIONS = [
  {
    id: 'RES-001',
    fecha: '2026-05-22',
    hora: '09:00',
    vehiculoId: 'TSJ-01',
    destino: 'Palacio de Justicia',
    motivo: 'Asistencia a sesión de pleno ordinario.',
    usuario: 'admin@correo.com',
    estado: 'Aprobado'
  }
];

// === ESTADO DE LA APLICACIÓN ===
let state = {
  userEmail: localStorage.getItem('userEmail') || 'jvargasarciniega@gmail.com',
  activeTab: 'dashboard',
  vehicles: JSON.parse(localStorage.getItem('fleet_vehicles')) || [...INITIAL_VEHICLES],
  logs: JSON.parse(localStorage.getItem('fleet_logs')) || [...INITIAL_LOGS],
  reservations: JSON.parse(localStorage.getItem('fleet_reservations')) || [...INITIAL_RESERVATIONS],
  selectedFleetFilter: 'Todos',
  vehicleSearch: '',
  logSearch: '',
  logDateFilter: ''
};

// Guardar cambios en local storage
function persistData() {
  localStorage.setItem('fleet_vehicles', JSON.stringify(state.vehicles));
  localStorage.setItem('fleet_logs', JSON.stringify(state.logs));
  localStorage.setItem('fleet_reservations', JSON.stringify(state.reservations));
}

// === TOAST NOTIFICATION ===
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');

  toastText.innerText = message;
  
  toast.className = `fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border transition-all duration-300 transform translate-y-0 opacity-100`;
  
  if (type === 'success') {
    toast.classList.add('bg-emerald-950', 'text-emerald-200', 'border-emerald-800/40');
    toastIcon.setAttribute('data-lucide', 'check-circle-2');
  } else if (type === 'error') {
    toast.classList.add('bg-rose-950', 'text-rose-200', 'border-rose-800/40');
    toastIcon.setAttribute('data-lucide', 'alert-triangle');
  } else {
    toast.classList.add('bg-slate-900', 'text-violet-200', 'border-violet-800/40');
    toastIcon.setAttribute('data-lucide', 'sparkles');
  }

  toast.classList.remove('hidden');
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3500);
}

// === GESTIÓN DE AUTENTICACIÓN ===
function handleLogout() {
  localStorage.removeItem('userEmail');
  showToast('Sesión cerrada correctamente.', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 500);
}

// === GESTIÓN DE VISTAS (TABS) ===
const TAB_PAGE_MAP = {
  dashboard: 'dashboard.html',
  fleet: 'fleet.html',
  reservations: 'reservations.html',
  logbook: 'logbook.html',
  reports: 'reports.html'
};

function getCurrentPageTab() {
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  return Object.entries(TAB_PAGE_MAP).find(([, page]) => page === currentPage)?.[0] || 'dashboard';
}

function switchTab(tabId) {
  const targetPage = TAB_PAGE_MAP[tabId];
  if (targetPage) {
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    if (currentPage !== targetPage) {
      window.location.href = targetPage;
      return;
    }
  }

  state.activeTab = tabId;
  
  // Cambiar clase activa en botones de navegación
  document.querySelectorAll('nav button').forEach(btn => {
    btn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800/40 hover:text-white";
  });

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-violet-600 to-indigo-650 text-white shadow-lg shadow-violet-500/10";
  }

  toggleSidebar(false);
  renderView();
}

function toggleSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  if (open) {
    sidebar.classList.remove('hidden');
    sidebar.classList.add('block', 'fixed', 'inset-0', 'w-full', 'h-full', 'p-6', 'bg-[#0d1326]');
  } else {
    sidebar.classList.remove('block', 'fixed', 'inset-0', 'w-full', 'h-full', 'p-6', 'bg-[#0d1326]');
    sidebar.classList.add('hidden', 'md:flex');
  }
}

// === GESTIÓN DE FLOTA Y MANTENIMIENTOS ===
function toggleMaintenance(vehicleId) {
  state.vehicles = state.vehicles.map(v => {
    if (v.id === vehicleId) {
      const isMaint = v.status === 'Mantenimiento';
      return { ...v, status: isMaint ? 'Disponible' : 'Mantenimiento' };
    }
    return v;
  });
  persistData();
  showToast('Estado del vehículo actualizado correctamente.', 'info');
  renderView();
}

function selectForReservation(vehicleId) {
  const elem = document.getElementById('res-vehicle-id');
  if (elem) {
    elem.value = vehicleId;
    switchTab('reservations');
    showToast(`Vehículo ${vehicleId} pre-seleccionado`, 'info');
  }
}

// === FILTROS DE FLOTA ===
function setFleetFilter(filter) {
  state.selectedFleetFilter = filter;
  
  const filters = {
    'Todos': 'filter-all',
    'Disponible': 'filter-avail',
    'En Uso': 'filter-use',
    'Mantenimiento': 'filter-maint'
  };

  Object.keys(filters).forEach(key => {
    const btn = document.getElementById(filters[key]);
    if (btn) {
      if (key === filter) {
        btn.className = "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-800 text-white border border-slate-700";
      } else {
        btn.className = "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap text-slate-400 hover:bg-slate-800/40 hover:text-slate-300";
      }
    }
  });

  renderFleet();
}

function handleFleetSearch(value) {
  state.vehicleSearch = value;
  renderFleet();
}

// === SUBMIT FORMULARIOS ===
function submitReservation(e) {
  e.preventDefault();
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const dest = document.getElementById('res-dest').value;
  const reason = document.getElementById('res-reason').value;
  const vehicleId = document.getElementById('res-vehicle-id').value;

  if (!date || !time || !dest || !reason || !vehicleId) {
    showToast('Por favor completa todos los campos de la reserva.', 'error');
    return;
  }

  const targetVehicle = state.vehicles.find(v => v.id === vehicleId);
  if (!targetVehicle) return;

  const newRes = {
    id: `RES-${Date.now().toString().slice(-4)}`,
    fecha: date,
    hora: time,
    vehiculoId: vehicleId,
    destino: dest,
    motivo: reason,
    usuario: state.userEmail,
    estado: 'Aprobado'
  };

  state.reservations.unshift(newRes);

  state.vehicles = state.vehicles.map(v => {
    if (v.id === vehicleId) {
      return { ...v, status: 'En Uso' };
    }
    return v;
  });

  const newLog = {
    id: `LOG-${Date.now().toString().slice(-3)}`,
    fecha: date,
    vehiculoId: targetVehicle.id,
    vehiculoName: targetVehicle.name,
    kmInicial: targetVehicle.km,
    combustible: targetVehicle.fuel,
    estado: 'Pendiente',
    usuario: state.userEmail,
    destino: dest,
    motivo: reason
  };
  
  state.logs.unshift(newLog);
  persistData();

  showToast(`Reserva aprobada y vehículo ${targetVehicle.name} despachado.`, 'success');
  
  document.getElementById('reservation-form').reset();
  switchTab('logbook');
}

function handleDespatchVehicleChange(vehicleId) {
  const v = state.vehicles.find(item => item.id === vehicleId);
  if (v) {
    const kmInput = document.getElementById('despatch-km');
    const fuelInput = document.getElementById('despatch-fuel');
    if (kmInput) kmInput.value = v.km;
    if (fuelInput) fuelInput.value = v.fuel;
  }
}

function submitDirectDespatch(e) {
  e.preventDefault();
  const vehicleId = document.getElementById('despatch-vehicle-id').value;
  const km = parseInt(document.getElementById('despatch-km').value);
  const fuel = parseInt(document.getElementById('despatch-fuel').value);
  const dest = document.getElementById('despatch-dest').value;
  const reason = document.getElementById('despatch-reason').value;

  if (!vehicleId || !km || !fuel || !dest || !reason) {
    showToast('Por favor completa todos los campos del despacho.', 'error');
    return;
  }

  const targetVehicle = state.vehicles.find(v => v.id === vehicleId);
  if (!targetVehicle) return;

  const todayStr = new Date().toISOString().split('T')[0];

  const newLog = {
    id: `LOG-${Date.now().toString().slice(-3)}`,
    fecha: todayStr,
    vehiculoId: vehicleId,
    vehiculoName: targetVehicle.name,
    kmInicial: km,
    combustible: fuel,
    estado: 'Pendiente',
    usuario: state.userEmail,
    destino: dest,
    motivo: reason
  };

  state.logs.unshift(newLog);

  state.vehicles = state.vehicles.map(v => {
    if (v.id === vehicleId) {
      return {
        ...v,
        status: 'En Uso',
        km: km,
        fuel: fuel
      };
    }
    return v;
  });

  persistData();
  showToast('Salida rápida registrada exitosamente.', 'success');
  document.getElementById('direct-despatch-form').reset();
  switchTab('logbook');
}

function resolveLog(logId) {
  state.logs = state.logs.map(l => {
    if (l.id === logId) {
      state.vehicles = state.vehicles.map(v => {
        if (v.id === l.vehiculoId) {
          return { ...v, status: 'Disponible', km: v.km + 140 };
        }
        return v;
      });
      return { ...l, estado: 'Correcto' };
    }
    return l;
  });
  persistData();
  showToast('Bitácora finalizada y vehículo liberado.', 'success');
  renderView();
}

// === FILTROS DE BITÁCORA ===
function handleLogSearch(value) {
  state.logSearch = value;
  toggleClearLogFilterButton();
  renderLogbook();
}

function handleLogDateSearch(value) {
  state.logDateFilter = value;
  toggleClearLogFilterButton();
  renderLogbook();
}

function toggleClearLogFilterButton() {
  const btn = document.getElementById('clear-log-filters');
  if (btn) {
    if (state.logSearch || state.logDateFilter) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  }
}

function clearLogFilters() {
  state.logSearch = '';
  state.logDateFilter = '';
  const searchInput = document.getElementById('log-search-input');
  const dateInput = document.getElementById('log-date-input');
  if (searchInput) searchInput.value = '';
  if (dateInput) dateInput.value = '';
  toggleClearLogFilterButton();
  renderLogbook();
}

// === ENGINE DE RENDERIZACIÓN ===
function calculateStats() {
  const total = state.vehicles.length;
  const disponibles = state.vehicles.filter(v => v.status === 'Disponible').length;
  const enUso = state.vehicles.filter(v => v.status === 'En Uso').length;
  const mantenimiento = state.vehicles.filter(v => v.status === 'Mantenimiento').length;

  const logsTotal = state.logs.length;
  const logsCorrectos = state.logs.filter(l => l.estado === 'Correcto').length;
  const logsPendientes = state.logs.filter(l => l.estado === 'Pendiente').length;

  return { total, disponibles, enUso, mantenimiento, logsTotal, logsCorrectos, logsPendientes };
}

function renderView() {
  const stats = calculateStats();
  
  const totalFleetBadge = document.getElementById('badge-total-fleet');
  if (totalFleetBadge) totalFleetBadge.innerText = stats.total;
  
  const resBadge = document.getElementById('badge-reservations');
  if (resBadge) {
    if (state.reservations.length > 0) {
      resBadge.innerText = state.reservations.length;
      resBadge.classList.remove('hidden');
    } else {
      resBadge.classList.add('hidden');
    }
  }

  const logsBadge = document.getElementById('badge-pending-logs');
  if (logsBadge) {
    if (stats.logsPendientes > 0) {
      logsBadge.innerText = stats.logsPendientes;
      logsBadge.classList.remove('hidden');
    } else {
      logsBadge.classList.add('hidden');
    }
  }

  if (state.activeTab === 'dashboard') {
    renderDashboard(stats);
  } else if (state.activeTab === 'fleet') {
    renderFleet();
  } else if (state.activeTab === 'reservations') {
    renderReservations();
  } else if (state.activeTab === 'logbook') {
    renderLogbook(stats);
  } else if (state.activeTab === 'reports') {
    renderReports();
  }

  lucide.createIcons();
}

// 1. RENDER DASHBOARD
function renderDashboard(stats) {
  const elements = {
    'metric-disponibles': stats.disponibles,
    'metric-uso': stats.enUso,
    'metric-mantenimiento': stats.mantenimiento,
    'metric-pendientes': stats.logsPendientes,
    'sum-disponibles': stats.disponibles,
    'sum-uso': stats.enUso,
    'sum-mantenimiento': stats.mantenimiento
  };

  Object.entries(elements).forEach(([id, value]) => {
    const elem = document.getElementById(id);
    if (elem) elem.innerText = value;
  });

  const container = document.getElementById('dashboard-recent-logs');
  if (container) {
    container.innerHTML = '';

    state.logs.slice(0, 3).forEach(log => {
      const item = document.createElement('div');
      item.className = 'p-4 bg-[#0a0f1d] rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-all';
      
      const badgeColor = log.estado === 'Correcto' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30' : 
                        log.estado === 'Pendiente' ? 'bg-amber-950/40 text-amber-400 border-amber-900/30' : 
                        'bg-sky-950/40 text-sky-400 border-sky-900/30';

      item.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-white">${log.vehiculoName}</span>
            <span class="text-[10px] text-slate-500">• ${log.fecha}</span>
          </div>
          <p class="text-xs text-slate-400 mt-1 font-medium">Destino: <span class="text-slate-200">${log.destino}</span></p>
          <p class="text-[11px] text-slate-500 mt-0.5">Usuario: ${log.usuario}</p>
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span class="text-[11px] px-2.5 py-1 rounded-full font-bold border ${badgeColor}">
            ${log.estado}
          </span>
          ${log.estado === 'Pendiente' ? `
            <button onclick="resolveLog('${log.id}')" class="p-1.5 text-emerald-400 hover:bg-emerald-950/40 rounded-lg border border-emerald-900 transition-all" title="Aprobar de regreso">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i>
            </button>
          ` : ''}
        </div>
      `;
      container.appendChild(item);
    });
    lucide.createIcons();
  }
}

// 2. RENDER FLOTA
function renderFleet() {
  const container = document.getElementById('fleet-grid');
  if (!container) return;
  container.innerHTML = '';

  const filtered = state.vehicles.filter(v => {
    const matchesStatus = state.selectedFleetFilter === 'Todos' || v.status === state.selectedFleetFilter;
    const matchesSearch = v.name.toLowerCase().includes(state.vehicleSearch.toLowerCase()) || 
                          v.id.toLowerCase().includes(state.vehicleSearch.toLowerCase()) ||
                          v.type.toLowerCase().includes(state.vehicleSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  filtered.forEach(vehicle => {
    const card = document.createElement('div');
    card.className = "bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between";
    
    const badgeStatusColor = vehicle.status === 'Disponible' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20' : 
                             vehicle.status === 'En Uso' ? 'bg-sky-950/50 text-sky-400 border-sky-500/20' : 
                             'bg-amber-950/50 text-amber-400 border-amber-500/20';

    const fuelProgressColor = vehicle.fuel < 25 ? 'bg-rose-500' : 
                              vehicle.fuel < 50 ? 'bg-amber-500' : 
                              'bg-emerald-500';

    card.innerHTML = `
      <div class="p-6">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[11px] bg-[#070b14] text-slate-400 font-bold tracking-widest px-2 py-0.5 rounded-md border border-slate-800/80">${vehicle.id}</span>
            <h3 class="text-md font-bold text-white mt-2">${vehicle.name}</h3>
            <p class="text-xs text-slate-500">${vehicle.type}</p>
          </div>
          <span class="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${badgeStatusColor}">
            ${vehicle.status}
          </span>
        </div>

        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="flex items-center gap-1.5 font-medium">
              <i data-lucide="gauge" class="w-4 h-4"></i>
              Kilometraje
            </span>
            <span class="font-bold text-slate-200">${vehicle.km.toLocaleString()} km</span>
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span class="flex items-center gap-1.5 font-medium">
                <i data-lucide="fuel" class="w-4 h-4"></i>
                Combustible
              </span>
              <span class="font-bold text-slate-200">${vehicle.fuel}%</span>
            </div>
            <div class="w-full bg-[#070b14] h-2 rounded-full overflow-hidden">
              <div class="h-full ${fuelProgressColor}" style="width: ${vehicle.fuel}%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-[#0a0f1d] border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button onclick="toggleMaintenance('${vehicle.id}')" class="text-xs px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1 ${vehicle.status === 'Mantenimiento' ? 'border-emerald-800/80 text-emerald-400 hover:bg-emerald-950/20' : 'border-slate-800 text-slate-400 hover:border-amber-800/80 hover:text-amber-400'}">
          <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
          <span>${vehicle.status === 'Mantenimiento' ? 'Liberar taller' : 'Mantenimiento'}</span>
        </button>
        ${vehicle.status === 'Disponible' ? `
          <button onclick="selectForReservation('${vehicle.id}')" class="text-xs bg-gradient-to-r from-violet-600 to-indigo-650 hover:from-violet-500 hover:to-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-md shadow-violet-700/10 transition-all">
            Reservar
          </button>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });
  lucide.createIcons();
}

// 3. RENDER RESERVACIONES
function renderReservations() {
  const select = document.getElementById('res-vehicle-id');
  const sideList = document.getElementById('quick-vehicle-selection');

  if (!select || !sideList) return;

  select.innerHTML = '<option value="">Seleccionar vehículo disponible</option>';
  sideList.innerHTML = '';

  const available = state.vehicles.filter(v => v.status === 'Disponible');

  available.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.innerText = `${v.name} (${v.id}) — Combustible: ${v.fuel}%`;
    select.appendChild(opt);

    const quickItem = document.createElement('div');
    quickItem.className = "p-3 rounded-xl border bg-slate-950/30 border-slate-800/60 text-slate-400 hover:border-violet-500/40 cursor-pointer transition-all flex items-center justify-between";
    quickItem.onclick = function() {
      select.value = v.id;
      showToast(`Vehículo ${v.name} asignado en el formulario.`, 'info');
    };

    quickItem.innerHTML = `
      <div>
        <span class="text-[11px] font-bold text-slate-200 block">${v.name}</span>
        <span class="text-[10px] text-slate-500">${v.km.toLocaleString()} km</span>
      </div>
      <div class="text-right">
        <span class="text-[11px] font-bold text-emerald-400 block">${v.fuel}% combustible</span>
      </div>
    `;
    sideList.appendChild(quickItem);
  });
}

// 4. RENDER BITÁCORA
function renderLogbook(stats) {
  if (!stats) stats = calculateStats();
  
  const statElements = {
    'log-stat-total': stats.logsTotal,
    'log-stat-correct': stats.logsCorrectos,
    'log-stat-pending': stats.logsPendientes
  };

  Object.entries(statElements).forEach(([id, value]) => {
    const elem = document.getElementById(id);
    if (elem) elem.innerText = value;
  });

  const tableBody = document.getElementById('log-table-body');
  if (tableBody) {
    tableBody.innerHTML = '';

    const filteredLogs = state.logs.filter(l => {
      const matchesSearch = l.vehiculoName.toLowerCase().includes(state.logSearch.toLowerCase()) ||
                            l.usuario.toLowerCase().includes(state.logSearch.toLowerCase()) ||
                            l.estado.toLowerCase().includes(state.logSearch.toLowerCase()) ||
                            l.id.toLowerCase().includes(state.logSearch.toLowerCase());
      const matchesDate = !state.logDateFilter || l.fecha === state.logDateFilter;
      return matchesSearch && matchesDate;
    });

    filteredLogs.forEach(log => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/20 transition-all text-xs border-b border-slate-800/50';
      
      const badgeColor = log.estado === 'Correcto' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30' : 
                        log.estado === 'Pendiente' ? 'bg-amber-950/50 text-amber-400 border-amber-900/30' : 
                        'bg-sky-950/50 text-sky-400 border-sky-900/30';

      tr.innerHTML = `
        <td class="px-6 py-4 text-slate-300 font-medium">${log.fecha}</td>
        <td class="px-6 py-4 font-bold text-white">${log.vehiculoName}</td>
        <td class="px-6 py-4 text-slate-400">${log.kmInicial.toLocaleString()} km</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-1.5">
            <span class="font-semibold text-slate-300">${log.combustible}%</span>
            <div class="w-12 bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div class="h-full bg-violet-500" style="width: ${log.combustible}%"></div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${badgeColor}">
            ${log.estado}
          </span>
        </td>
        <td class="px-6 py-4 text-slate-400">${log.usuario}</td>
        <td class="px-6 py-4 text-right">
          ${log.estado === 'Pendiente' ? `
            <button onclick="resolveLog('${log.id}')" class="px-2.5 py-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 rounded-lg text-[11px] font-bold transition-all border border-emerald-800">
              Marcar Correcto
            </button>
          ` : '<span class="text-slate-500 italic text-[11px]">Cerrado</span>'}
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  const detailedGrid = document.getElementById('detailed-logs-grid');
  if (detailedGrid) {
    detailedGrid.innerHTML = '';

    state.logs.slice(0, 2).forEach(log => {
      const detailCard = document.createElement('div');
      detailCard.className = "bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 relative";
      
      const badgeColor = log.estado === 'Correcto' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/25' : 'bg-amber-950/50 text-amber-400 border-amber-900/25';

      detailCard.innerHTML = `
        <div class="absolute top-6 right-6">
          <span class="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${badgeColor}">
            ${log.estado}
          </span>
        </div>
        <h4 class="text-lg font-bold text-white">${log.vehiculoName}</h4>
        <span class="text-xs text-slate-400 block mt-1 capitalize">${log.fecha}</span>

        <div class="grid grid-cols-2 gap-4 my-6">
          <div>
            <span class="text-[10px] uppercase text-slate-500 block">Kilometraje Inicial</span>
            <span class="text-md font-extrabold text-slate-200">${log.kmInicial.toLocaleString()} km</span>
          </div>
          <div>
            <span class="text-[10px] uppercase text-slate-500 block">Combustible Inicial</span>
            <span class="text-md font-extrabold text-slate-200">${log.combustible}%</span>
          </div>
        </div>

        <div class="space-y-2 border-t border-slate-800/50 pt-4">
          <p class="text-xs text-slate-400"><strong class="text-slate-300">Observaciones:</strong> ${log.motivo}</p>
          <p class="text-xs text-slate-400"><strong class="text-slate-300">Destino de la ruta:</strong> ${log.destino}</p>
          <p class="text-[11px] text-slate-500 font-medium">Usuario registrado: ${log.usuario}</p>
        </div>
      `;
      detailedGrid.appendChild(detailCard);
    });
  }
}

// 5. RENDER REPORTES
function renderReports() {
  const select = document.getElementById('despatch-vehicle-id');
  if (!select) return;
  select.innerHTML = '<option value="">Seleccionar vehículo</option>';

  const available = state.vehicles.filter(v => v.status === 'Disponible');

  available.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.innerText = `${v.name} (${v.id}) — ${v.km.toLocaleString()} km`;
    select.appendChild(opt);
  });
}

// === INICIALIZACIÓN ===
window.addEventListener('DOMContentLoaded', () => {
  const sidebarUserEmail = document.getElementById('sidebar-user-email');
  if (sidebarUserEmail) {
    sidebarUserEmail.innerText = state.userEmail;
  }

  state.activeTab = getCurrentPageTab();
  renderView();
  lucide.createIcons();
});
