//import Product from "../models/product.model.js";
import { Product, Category, User, ProductPhoto } from "../models/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar productos", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar productos", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try{
    const { sellerId, title, description, price, categoryId, status = 'active' } = req.body;

    const categoryExists = await Category.findByPk(categoryId);
    if(!categoryExists) return res.status(404).json({message: "Categoría no encontrada"});

    const sellerExists = await User.findByPk(sellerId);
    if(!sellerExists) return res.status(404).json({message: "Vendedor no encontrado"});

    const product = await Product.create({
      sellerId, 
      title, 
      description, 
      price, 
      categoryId, 
      status
    });

    res.status(201).json({message: "Producto creado de forma exitosa", product});

  } catch (error) {
    res.status(500).json({message: "Error al crear un producto", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, categoryId, status } = req.body;
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if(!product) return res.status(404).json({ message: "Producto no encontrado" });

    if(categoryId) {
      const categoryExists = await Category.findByPk(categoryId);
      if(!categoryExists) return res.status(400).json({ message: "Categoría no válida" });
    }

    await product.update({ title: title || product.title,
      description: description || product.description,
      price: price || product.price,
      categoryId: categoryId || product.categoryId,
      status: status || product.status
     });

     res.json({ message: "Producto actualizado", product });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const productId = req.params.id;
    const validStatuses = ['active', 'sold', 'inactive', 'reserved'];

    if(!validStatuses.includes(status)) return res.status(400).json({ message: "Status no valido" });

    const product = await Product.findByPk(productId);

    if(!product) return res.status(404).json({ message: "Producto no encontrado" });

    await product.update({status});

    res.json({ message: "Status actualizado", newStatus: status, product});
  } catch (error) {
    res.status(500).json({message: "Error al actualizar el status", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if(!product) return res.status(404).json({ message: "Producto no encontrado" });

    await ProductPhoto.destroy({ where: { productId } });

    await product.destroy();
    res.json({ message: "Producto eliminado", product });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};
