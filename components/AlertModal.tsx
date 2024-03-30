"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [IsMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!IsMounted) return null;
  return (
    <Modal
      description="This action cannot be undone."
      title="Are you sure?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 skew-x-2 flex items-center justify-end w-full gap-3">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
