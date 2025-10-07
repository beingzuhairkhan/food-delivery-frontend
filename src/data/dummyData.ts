import type { MenuItem } from '../contexts/CartContext';
import { LocalStorageService } from '../services/localStorageService';

// Category interface for better type safety
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Default categories data (will be stored in localStorage)
const defaultCategories: Category[] = [
  {
    id: 'sweets',
    name: 'Sweets',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    description: 'Traditional and modern sweet treats',
  },
  {
    id: 'main-course',
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    description: 'Hearty and satisfying main dishes',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    description: 'Delicious desserts to end your meal',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    description: 'Fresh pizzas with various toppings',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Juicy burgers with premium ingredients',
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop',
    description: 'Fresh sandwiches made to order',
  },
];

// Default food items data (will be stored in localStorage)
const defaultFoodItems: MenuItem[] = [
  // Sweets
  {
    id: 'sweet-1',
    name: 'Gulab Jamun',
    description: 'Soft and spongy milk dumplings soaked in rose-flavored sugar syrup',
    price: 120,
    category: 'sweets',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'sweet-2',
    name: 'Rasgulla',
    description: 'Spongy cottage cheese balls in sugar syrup',
    price: 100,
    category: 'sweets',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },
  {
    id: 'sweet-3',
    name: 'Jalebi',
    description: 'Crispy spiral-shaped sweet dipped in sugar syrup',
    price: 80,
    category: 'sweets',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },

  // Main Course
  {
    id: 'main-1',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    price: 350,
    category: 'main-course',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },
  {
    id: 'main-2',
    name: 'Paneer Makhani',
    description: 'Rich and creamy cottage cheese curry in tomato gravy',
    price: 320,
    category: 'main-course',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },
  {
    id: 'main-3',
    name: 'Biryani',
    description: 'Fragrant basmati rice with spiced meat or vegetables',
    price: 380,
    category: 'main-course',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246135197e?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },
  {
    id: 'main-4',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in rich and creamy gravy',
    price: 280,
    category: 'main-course',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten chocolate center',
    price: 180,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'dessert-2',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 220,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'dessert-3',
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with chocolate sauce and nuts',
    price: 150,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    isAvailable: true,
  },

  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 250,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with spicy pepperoni and mozzarella cheese',
    price: 320,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'pizza-3',
    name: 'Veggie Supreme',
    description: 'Loaded with bell peppers, mushrooms, onions, and olives',
    price: 300,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'pizza-4',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
    price: 380,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },

  // Burgers
  {
    id: 'burger-1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 280,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'burger-2',
    name: 'Veggie Burger',
    description: 'Plant-based patty with fresh vegetables and vegan mayo',
    price: 240,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'burger-3',
    name: 'Chicken Deluxe',
    description: 'Grilled chicken breast with bacon and cheese',
    price: 320,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'burger-4',
    name: 'Fish Burger',
    description: 'Crispy fish fillet with tartar sauce and lettuce',
    price: 300,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e608ebc5?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },

  // Sandwiches
  {
    id: 'sandwich-1',
    name: 'Club Sandwich',
    description: 'Triple-decker with chicken, bacon, lettuce, and tomato',
    price: 220,
    category: 'sandwiches',
    imageUrl: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'sandwich-2',
    name: 'Grilled Cheese',
    description: 'Melted cheese between golden grilled bread',
    price: 160,
    category: 'sandwiches',
    imageUrl: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'sandwich-3',
    name: 'Paneer Tikka Sandwich',
    description: 'Grilled cottage cheese with mint chutney and vegetables',
    price: 200,
    category: 'sandwiches',
    imageUrl: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop',
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
  {
    id: 'sandwich-4',
    name: 'BLT Sandwich',
    description: 'Bacon, lettuce, and tomato with mayo on toasted bread',
    price: 180,
    category: 'sandwiches',
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
  },
];

// Initialize data in localStorage if not present
const initializeData = (): void => {
  if (!LocalStorageService.hasStoredData()) {
    console.log('Initializing dummy data in localStorage...');
    LocalStorageService.saveAllData(defaultCategories, defaultFoodItems);
  }
};

// Initialize data on module load
initializeData();

// Helper functions to work with localStorage data
export const getCategories = (): Category[] => {
  initializeData(); // Ensure data is initialized
  return LocalStorageService.getCategories() || defaultCategories;
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  const categories = getCategories();
  return categories.find((category) => category.id === categoryId);
};

export const getFoodItemsByCategory = (categoryId: string): MenuItem[] => {
  const foodItems = getAllFoodItems();
  return foodItems.filter((item) => item.category === categoryId);
};

export const getAllFoodItems = (): MenuItem[] => {
  initializeData(); // Ensure data is initialized
  return LocalStorageService.getFoodItems() || defaultFoodItems;
};

export const getFoodItemById = (itemId: string): MenuItem | undefined => {
  const foodItems = getAllFoodItems();
  return foodItems.find((item) => item.id === itemId);
};

// Additional functions for managing data
export const addCategory = (category: Category): void => {
  LocalStorageService.addCategory(category);
};

export const updateCategory = (categoryId: string, updates: Partial<Category>): void => {
  LocalStorageService.updateCategory(categoryId, updates);
};

export const removeCategory = (categoryId: string): void => {
  LocalStorageService.removeCategory(categoryId);
};

export const addFoodItem = (foodItem: MenuItem): void => {
  LocalStorageService.addFoodItem(foodItem);
};

export const updateFoodItem = (itemId: string, updates: Partial<MenuItem>): void => {
  LocalStorageService.updateFoodItem(itemId, updates);
};

export const removeFoodItem = (itemId: string): void => {
  LocalStorageService.removeFoodItem(itemId);
};

export const clearAllData = (): void => {
  LocalStorageService.clearAllData();
};

export const resetToDefaultData = (): void => {
  LocalStorageService.clearAllData();
  LocalStorageService.saveAllData(defaultCategories, defaultFoodItems);
};

export const getDataInfo = () => {
  const size = LocalStorageService.getDataSize();
  const categories = getCategories();
  const foodItems = getAllFoodItems();

  return {
    categoriesCount: categories.length,
    foodItemsCount: foodItems.length,
    totalSize: size.total,
    sizeBreakdown: size,
  };
};

// Export categories for backward compatibility
export const categories = getCategories();
