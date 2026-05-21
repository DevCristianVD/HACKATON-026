// js/clases.js

class GestorFlota {
    constructor() {
        this.storageKey = 'tecmm_vehicles';
        this.vehiculos = JSON.parse(localStorage.getItem(this.storageKey)) || this.obtenerSemilla();
    }
    obtenerSemilla() {
        return [
            { id: 'ECO-01', name: 'Nissan NP300 ECO-01', type: 'Camioneta PickUp', km: 45600, fuel: 75, status: 'Disponible' },
            { id: 'ECO-02', name: 'Toyota Hilux ECO-02', type: 'Camioneta', km: 22000, fuel: 50, status: 'Disponible' },
            { id: 'ECO-03', name: 'VW Sedán ECO-03', type: 'Sedán', km: 85260, fuel: 60, status: 'En Uso' }
        ];
    }
    guardar() { localStorage.setItem(this.storageKey, JSON.stringify(this.vehiculos)); }
    obtenerTodos() { return this.vehiculos; }
    calcularEstadisticas() {
        return {
            total: this.vehiculos.length,
            disponibles: this.vehiculos.filter(v => v.status === 'Disponible').length,
            enUso: this.vehiculos.filter(v => v.status === 'En Uso').length,
            mantenimiento: this.vehiculos.filter(v => v.status === 'Mantenimiento').length
        };
    }
}

class GestorBitacoras {
    constructor() {
        this.storageKey = 'tecmm_logs';
        this.logs = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }
    calcularEstadisticas() {
        return {
            pendientes: this.logs.filter(l => l.estado === 'Pendiente').length
        };
    }
}

// Instanciar globalmente para que las páginas las usen
const flota = new GestorFlota();
const bitacoras = new GestorBitacoras();