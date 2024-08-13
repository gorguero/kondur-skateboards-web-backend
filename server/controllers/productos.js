import Producto from "../models/producto.js";
import { json } from "express";

//Crear Producto
const createProducto = async (req, res) => {
  try {
    let producto;
    producto = new Producto(req.body);
    await producto.save();
    res.send(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtener Productos
const getProductosPaginados = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  try {
    const [productos, totalProductos] = await Promise.all([
      Producto.find({ estado: true }).skip(desde).limit(5),
      Producto.countDocuments(),
    ]);

    res.status(200).json({
      productos,
      totalProductos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtener productos PARA ADMIN
const getPaginatedProductos = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const nombreProducto = req.query.nombreProducto || '';

  try {
      // Crear un objeto de consulta
      let query = { estado: true };

      // Filtrar por nombre de producto
      if (nombreProducto) {
          query['nombreProducto'] = { $regex: nombreProducto, $options: 'i' };
      }

      const [productos, totalProductos] = await Promise.all([
          Producto.find(query).skip(desde).limit(5),
          Producto.countDocuments(query)
      ]);

      res.status(200).json({
          productos,
          totalProductos
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error });
  }
};


//Obtener Productos
const getProducts = async (req, res)=>{
  try {
      const productos = await Producto.find({estado: true});
      res.status(200).json(productos);
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}
// Obtener productos paginados
const getProductsFilter = async (req, res) => {
  const tipos_productos = ["indumentaria", "tablas", "lijas"];

  const tipoProducto = req.query.tipo;
  if (!tipos_productos.includes(tipoProducto))
    return res.status(400).json({ msg: "No existe ese tipo de producto" });

  try {
    let productos = await Producto.find({ categoria: `${tipoProducto}`, estado: true });
    if (!productos) {
      res.status(400).json({ msg: "No encontramos productos." });
    }

    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error, comuniquese con su administrador.");
  }
};

const updateProducto = async (req, res) => {
  try {
    const {
      nombreProducto,
      descripcion,
      imagen,
      precio,
      categoria,
      estado,
      tallas,
      medidas,
    } = req.body;
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msj: "No existe el producto" });
    }

    producto.nombreProducto = nombreProducto;
    producto.descripcion = descripcion;
    producto.imagen = imagen;
    producto.precio = precio;
    producto.categoria = categoria;
    producto.estado = estado;
    producto.tallas = tallas;
    producto.medidas = medidas;

    producto = await producto.save(); // Guarda los cambios
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Buscar un Producto
const getProducto = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "No existe el producto" });
    }
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};



// Función para reducir el stock de un producto
const reducirStock = async (_id, cantidad, talla, medida) => {
  console.log(
    "LO QUE RECIVE REDUCIR STOCK: " +
      _id +
      " CANTIDAD: " +
      cantidad +
      " TALLA: " +
      talla +
      " MEDIDA: " +
      medida
  );
  try {
    const producto = await Producto.findById(_id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (talla) {
      if (producto.tallas[talla] === undefined) {
        throw new Error(`La talla ${talla} no existe para el producto`);
      }
      if (producto.tallas[talla] < cantidad) {
        throw new Error(`Stock insuficiente para la talla ${talla}`);
      }
      producto.tallas[talla] -= cantidad;
    } else if (medida) {
      if (producto.medidas[medida] === undefined) {
        throw new Error(`La medida ${medida} no existe para el producto`);
      }
      if (producto.medidas[medida] < cantidad) {
        throw new Error(`Stock insuficiente para la medida ${medida}`);
      }
      producto.medidas[medida] -= cantidad;
    } else {
      throw new Error('Debe proporcionar una talla o medida');
    }

    await producto.save();
  } catch (error) {
    console.error(`Error al reducir el stock: ${error.message}`);
    throw error;
  }
};

//Eliminar producto
const deleteProducto = async (req, res) => {
  try {
    let producto = await Producto.findOne({
      _id: req.params.id,
      estado: false,
    });

    producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      { estado: false },
      { new: true }
    );
    res.json({ msj: "Porducto eliminado con exito!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("NO SE ENCONTRO EL ID");
  }
};


export {
  createProducto,
  getProductosPaginados,
  getPaginatedProductos,
  getProducto,
  getProducts,
  getProductsFilter,
  updateProducto,
  reducirStock,
  deleteProducto,
};
