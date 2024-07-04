import Producto from "../models/producto.js";
import { Venta } from "../services/ventaService.js";
//Total de Productos por Categoría
const getTotalProductosPorCategoria = async (req, res) => {
  try {
    const productosPorCategoria = await Producto.aggregate([
      {
        $group: {
          _id: "$categoria",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(productosPorCategoria);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las estadísticas" });
  }
};

//Total de Ventas
const getTotalVentas = async (req, res) => {
  try {
    const totalVentas = await Venta.countDocuments();
    res.json({ totalVentas });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las estadísticas" });
  }
};

//Ventas por Mes
const getVentasPorMes = async (req, res) => {
  try {
    const ventasPorMes = await Venta.aggregate([
      {
        $group: {
          _id: { $month: "$creado_en" },
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(ventasPorMes);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las estadísticas" });
  }
};
// Ingresos por mes
const getIngresosPorMes = async (req, res) => {
    try {
      const ingresosPorMes = await Venta.aggregate([
        {
          $unwind: "$productos"
        },
        {
          $group: {
            _id: { $month: "$creado_en" }, // Agrupa por mes
            total: {
              $sum: { $multiply: ["$productos.precio", "$productos.cantidad"] }
            } 
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(ingresosPorMes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Ingresos Totales
const getIngresosTotales = async (req, res) => {
  try {
    const ventas = await Venta.find();

    const ingresosTotales = ventas.reduce((acc, venta) => {
      const totalVenta = venta.productos.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
      }, 0);
      return acc + totalVenta;
    }, 0);

    res.json({ totalIngresos: ingresosTotales });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las estadísticas" });
  }
};

//Productos más Vendidos
const getProductosMasVendidos = async (req, res) => {
  try {
    const productosMasVendidos = await Venta.aggregate([
      { $unwind: "$productos" },
      {
        $group: {
          _id: "$productos.nombreProducto",
          total: { $sum: "$productos.cantidad" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);
    res.json(productosMasVendidos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las estadísticas" });
  }
};


  
export {
  getTotalProductosPorCategoria,
  getTotalVentas,
  getVentasPorMes,
  getIngresosTotales,
  getProductosMasVendidos,
  getIngresosPorMes,
};
