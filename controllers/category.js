const asyncHandler = require("express-async-handler");
const { Category } = require("../model/category");

// إنشاء مستخدم جديد
exports.createCategory = asyncHandler(async (req, res) => {
  //   const { error } = validateAddUser(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }
  const { id, name, image } = req.body;
  const newCateory = await Category.create({ id, name, image });
  return res.status(201).json(newCateory);
});

// جلب جميع المستخدمين
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

// جلب مستخدم محدد
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ error: "category not found" });
  return res.status(200).json(category);
});

// تحديث مستخدم
exports.updatecategory = asyncHandler(async (req, res) => {
  const CategoryId = req.params.id;
  console.log(req.params.id);
  console.log(CategoryId);

  const updates = req.body;

  const [updateRows] = await Category.update(updates, {
    where: { id: CategoryId },
  });
  console.log(updateRows);

  if (updateRows === 0) {
    return res.status(404).json({ error: "category not found" });
  }
  return res.status(200).json({ message: "category updated successfully" });
});

// حذف مستخدم
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ error: "category not found" });

  await category.destroy();
  res.status(204).send();
});
