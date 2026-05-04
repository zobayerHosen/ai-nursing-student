"use client";

import { Modal } from "antd";
import { useState } from "react";

import img01 from "@/public/assets/library/default_folder.svg";
import img02 from "@/public/assets/library/clinic.svg";
import img03 from "@/public/assets/library/heart.svg";
import img04 from "@/public/assets/library/home.svg";
import img05 from "@/public/assets/library/capsoul.svg";
import Image from "next/image";

const icons = [
    { id: "default_folder", icon: img01 },
    { id: "clinic", icon: img02 },
    { id: "heart", icon: img03 },
    { id: "home", icon: img04 },
    { id: "capsoul", icon: img05 },
];

const colors = [
    "#3B82F6", // blue
    "#F43F5E", // pink
    "#16A34A", // green
    "#B45309", // orange
    "#7C3AED", // purple
    "#0891B2", // cyan
    "#DC2626", // red
    "#9CA3AF", // gray
];

const FolderCreateModal = ({ isModalOpen, setIsModalOpen }) => {
    const [folderName, setFolderName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("default_folder");
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    // Note: save data to local storage
    const handleSave = () => {
        const data = {
            id: Date.now(),
            name: folderName,
            icon: selectedIcon,
            color: selectedColor,
        };

        // Note: get existing data
        const existingData = localStorage.getItem("folderData");

        let folders = [];

        if (existingData) {
            folders = JSON.parse(existingData);
        }

        folders.push(data);

        localStorage.setItem("folderData", JSON.stringify(folders));

        // Note: reset all data
        setFolderName("");
        setSelectedIcon("default_folder");
        setSelectedColor(colors[0]);

        setIsModalOpen(false);
    };

    return (
        <Modal
            centered
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            styles={{
                content: {
                    borderRadius: "16px",
                    padding: "0px",
                },
            }}
            className="w-full! max-w-107.5! px-0!"
        >
            <div className="">
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#12283B] font-inter">
                    Create Folder
                </h2>

                <hr className="my-4 text-gray-200" />

                {/* Folder Name */}
                <div className="mb-4">
                    <p className="mb-1 text-base text-gray-800! font-semibold">
                        Folder Name
                    </p>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary text-base font-medium"
                        placeholder="e.g. Fundamentals, OB Notes…
"
                    />
                </div>

                {/* Icon */}
                <div className="mb-4">
                    <p className="mb-2 text-sm text-[#424242] font-semibold!">Icon</p>
                    <div className="flex gap-2">
                        {icons.map((item) => {
                            const Icon = item.icon;
                            const isActive = selectedIcon === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIcon(item.id)}
                                    className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-md border 
                                        ${isActive
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <Image
                                        src={Icon}
                                        alt={item.id}
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Color */}
                <div className="mb-6">
                    <p className="mb-2 text-sm text-[#424242] font-semibold!">Color</p>
                    <div className="flex gap-2">
                        {colors.map((color) => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-6 w-6 cursor-pointer rounded-full border-2 ${selectedColor === color
                                    ? "border-gray-300"
                                    : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="border border-primary text-primary cursor-pointer rounded-md px-4 py-1.5 text-base font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="cursor-pointer font-semibold rounded-md bg-primary px-4 py-1.5 text-base  text-white/95 hover:bg-primary/90 transition-colors"
                    >
                        Create folder
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FolderCreateModal;