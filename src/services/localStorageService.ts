import type { MenuItem } from '../contexts/CartContext';
import type { Category } from '../data/dummyData';

// Local storage keys
const STORAGE_KEYS = {
  CATEGORIES: 'food_delivery_categories',
  FOOD_ITEMS: 'food_delivery_food_items',
} as const;

// Local storage service for managing dummy data
export class LocalStorageService {
  /**
   * Save categories to local storage
   */
  static saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
    }
  }

  /**
   * Get categories from local storage
   */
  static getCategories(): Category[] | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading categories from localStorage:', error);
      return null;
    }
  }

  /**
   * Save food items to local storage
   */
  static saveFoodItems(foodItems: MenuItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(foodItems));
    } catch (error) {
      console.error('Error saving food items to localStorage:', error);
    }
  }

  /**
   * Get food items from local storage
   */
  static getFoodItems(): MenuItem[] | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading food items from localStorage:', error);
      return null;
    }
  }

  /**
   * Save both categories and food items
   */
  static saveAllData(categories: Category[], foodItems: MenuItem[]): void {
    try {
      this.saveCategories(categories);
      this.saveFoodItems(foodItems);
    } catch (error) {
      console.error('Error saving all data to localStorage:', error);
    }
  }

  /**
   * Get all data from local storage
   */
  static getAllData(): { categories: Category[] | null; foodItems: MenuItem[] | null } {
    return {
      categories: this.getCategories(),
      foodItems: this.getFoodItems(),
    };
  }

  /**
   * Clear all dummy data from local storage
   */
  static clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.FOOD_ITEMS);
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
    }
  }

  /**
   * Check if data exists in local storage
   */
  static hasStoredData(): boolean {
    return Boolean(
      localStorage.getItem(STORAGE_KEYS.CATEGORIES) &&
        localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS),
    );
  }

  /**
   * Add a new food item to existing stored data
   */
  static addFoodItem(newItem: MenuItem): void {
    try {
      const existingItems = this.getFoodItems() || [];
      const updatedItems = [...existingItems, newItem];
      this.saveFoodItems(updatedItems);
    } catch (error) {
      console.error('Error adding food item to localStorage:', error);
    }
  }

  /**
   * Update an existing food item
   */
  static updateFoodItem(itemId: string, updatedItem: Partial<MenuItem>): void {
    try {
      const existingItems = this.getFoodItems() || [];
      const updatedItems = existingItems.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item,
      );
      this.saveFoodItems(updatedItems);
    } catch (error) {
      console.error('Error updating food item in localStorage:', error);
    }
  }

  /**
   * Remove a food item
   */
  static removeFoodItem(itemId: string): void {
    try {
      const existingItems = this.getFoodItems() || [];
      const updatedItems = existingItems.filter((item) => item.id !== itemId);
      this.saveFoodItems(updatedItems);
    } catch (error) {
      console.error('Error removing food item from localStorage:', error);
    }
  }

  /**
   * Add a new category to existing stored data
   */
  static addCategory(newCategory: Category): void {
    try {
      const existingCategories = this.getCategories() || [];
      const updatedCategories = [...existingCategories, newCategory];
      this.saveCategories(updatedCategories);
    } catch (error) {
      console.error('Error adding category to localStorage:', error);
    }
  }

  /**
   * Update an existing category
   */
  static updateCategory(categoryId: string, updatedCategory: Partial<Category>): void {
    try {
      const existingCategories = this.getCategories() || [];
      const updatedCategories = existingCategories.map((category) =>
        category.id === categoryId ? { ...category, ...updatedCategory } : category,
      );
      this.saveCategories(updatedCategories);
    } catch (error) {
      console.error('Error updating category in localStorage:', error);
    }
  }

  /**
   * Remove a category
   */
  static removeCategory(categoryId: string): void {
    try {
      const existingCategories = this.getCategories() || [];
      const updatedCategories = existingCategories.filter((category) => category.id !== categoryId);
      this.saveCategories(updatedCategories);
    } catch (error) {
      console.error('Error removing category from localStorage:', error);
    }
  }

  /**
   * Get data size in bytes (approximate)
   */
  static getDataSize(): { categories: number; foodItems: number; total: number } {
    try {
      const categoriesData = localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '';
      const foodItemsData = localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS) || '';

      const categoriesSize = new Blob([categoriesData]).size;
      const foodItemsSize = new Blob([foodItemsData]).size;

      return {
        categories: categoriesSize,
        foodItems: foodItemsSize,
        total: categoriesSize + foodItemsSize,
      };
    } catch (error) {
      console.error('Error calculating data size:', error);
      return { categories: 0, foodItems: 0, total: 0 };
    }
  }
}
