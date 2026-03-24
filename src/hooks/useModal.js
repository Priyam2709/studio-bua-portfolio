import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeData, setActiveData] = useState(null);

  const openModal = useCallback((data) => {
    setActiveData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setActiveData(null), 300); // Wait for transition
    document.body.style.overflow = 'unset';
  }, []);

  return { isOpen, activeData, openModal, closeModal };
};
