/**
 * useModal - Custom hook for managing modal state
 *
 * Centralizes modal state management including:
 * - Which modal is currently open
 * - The clothing item being viewed/edited
 * - The item selected for deletion
 *
 * This hook prevents prop drilling and keeps modal state organized
 */

import { useState, useCallback } from "react";

/**
 * useModal hook factory
 * @returns {Object} Modal state and control methods
 */
export const useModal = () => {
  // Track which modal is currently open (e.g., "preview", "add-garment", "login")
  const [activeModal, setActiveModal] = useState("");

  // Store the clothing item card being previewed/edited
  const [selectedCard, setSelectedCard] = useState({});

  // Store the ID of the item selected for deletion
  const [selectedItemId, setSelectedItemId] = useState(-1);

  /**
   * Opens a modal and optionally selects a card
   * @param {string} modalName - The name of the modal to open
   * @param {Object} card - Optional card/item data to display in the modal
   */
  const openModal = useCallback((modalName, card = null) => {
    setActiveModal(modalName);
    if (card) {
      setSelectedCard(card);
    }
  }, []);

  /**
   * Closes the current modal and resets all related state
   */
  const closeModal = useCallback(() => {
    setActiveModal("");
    setSelectedCard({});
    setSelectedItemId(-1);
  }, []);

  /**
   * Marks an item for deletion
   * @param {string} itemId - The ID of the item to delete
   */
  const setItemToDelete = useCallback((itemId) => {
    setSelectedItemId(itemId);
  }, []);

  /**
   * Clears the item marked for deletion
   */
  const clearItemToDelete = useCallback(() => {
    setSelectedItemId(-1);
  }, []);

  // Return all modal state and control methods
  return {
    activeModal,
    selectedCard,
    selectedItemId,
    openModal,
    closeModal,
    setItemToDelete,
    clearItemToDelete,
  };
};
