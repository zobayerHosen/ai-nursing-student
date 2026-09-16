"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { useGetFlashcardCategory } from "@/hooks/flashcards";
import FlashcardPlayer from "./flashcard-player";
import { motion } from "framer-motion";

const TopicList = ({ topicList: id }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const { flashcardData, isLoading } = useGetFlashcardCategory();

    // Find subcategory or category decks
    let subtopics = [];
    let categoryTitle = typeof id === "string" ? id.replace(/-/g, ' ') : "";
    let categoryId = null;

    if (flashcardData) {
        for (const category of flashcardData) {
            if (category.id?.toString() === id?.toString()) {
                subtopics = category.decks || [];
                categoryTitle = category.name;
                categoryId = category.id;
                break;
            }
            const sub = category.subcategories?.find(s => s.id?.toString() === id?.toString());
            if (sub) {
                subtopics = sub.cards || [];
                categoryTitle = sub.name;
                categoryId = category.id;
                break;
            }
            const deckMatch = category.decks?.find(d => d.id?.toString() === id?.toString());
            if (deckMatch && !selectedTopic) {
                return (
                    <FlashcardPlayer
                        topic={deckMatch}
                        deckId={deckMatch.id}
                        onBack={() => window.history.back()}
                        categoryId={category.id}
                    />
                );
            }
        }
    }

    // Handle topic click
    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    // Handle back to topics
    const handleBackToTopics = () => {
        setSelectedTopic(null);
    };

    // If selected topic then show flashcard player
    if (selectedTopic) {
        return (
            <FlashcardPlayer
                topic={selectedTopic}
                deckId={selectedTopic.id}
                onBack={handleBackToTopics}
                categoryId={categoryId}
            />
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#424242] capitalize mb-2">
                    {categoryTitle || "Flashcard Decks"}
                </h1>
                <p className="text-gray-500 font-normal">Select a deck to start practicing with flashcards</p>
            </div>

            {isLoading ? (
                <div className="text-center py-10 text-gray-500">Loading decks...</div>
            ) : subtopics?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subtopics?.map((topic, index) => {
                        const cardCount = topic.card_count ?? topic.questions?.length ?? 0;
                        return (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleTopicClick(topic)}
                                className="group relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                            >
                                <div className="absolute -right-6 -top-6 w-14 h-14 bg-primary/5 rounded-full group-hover:scale-[100] transition-transform duration-300"></div>

                                <div className="relative z-10 space-y-3">
                                    <div className="w-full flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <BookOpen size={13} />
                                        </div>

                                        <h3 className="text-base font-bold text-[#424242] group-hover:text-primary transition-colors">
                                            {topic?.name ?? ""}
                                        </h3>
                                    </div>

                                    {topic?.description && (
                                        <p className="text-xs text-gray-400 line-clamp-2">
                                            {topic.description}
                                        </p>
                                    )}
                                </div>

                                <div className="relative z-10 flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
                                            <span className="text-primary">{cardCount}</span> Cards
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-primary font-bold text-sm">
                                        Start <ChevronRight size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center shadow-sm">
                    <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <GraduationCap size={40} className="text-gray-300" />
                    </div>
                    <h2 className="text-xl font-bold text-[#424242] mb-2">No decks found</h2>
                    <p className="text-gray-500">We are still preparing flashcards for this category. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default TopicList;
