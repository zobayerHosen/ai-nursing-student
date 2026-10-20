"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight, ChevronDown, Layers, Bookmark } from "lucide-react";
import { useGetDeckDetails, useToggleFavoriteDeck } from "@/hooks/flashcards";
import toast from "react-hot-toast";

export default function DeckSubcategoryCard({ deck, onToggleFavorite, isFav }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleFavorite } = useToggleFavoriteDeck();
  const [internalFavMap, setInternalFavMap] = useState({});

  const {
    deckData,
    isLoading,
    isError,
  } = useGetDeckDetails(deck?.id);

  const deckDetails = deckData?.data ?? deckData;
  const subcategories = Array.isArray(deckDetails?.subcategories)
    ? deckDetails.subcategories
    : Array.isArray(deck?.subcategories)
      ? deck.subcategories
      : [];

  console.log("Sub", subcategories)

  const checkIsFav = (itemId, itemObj) => {
    if (isFav) return isFav(itemId);
    if (internalFavMap[itemId] !== undefined) return internalFavMap[itemId];
    return Boolean(itemObj?.is_favorite ?? itemObj?.is_favorited ?? false);
  };

  const handleToggle = async (item, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (onToggleFavorite) {
      onToggleFavorite(item, e);
      return;
    }
    if (!item?.id) return;

    const currentlyFav = checkIsFav(item.id, item);
    const nextState = !currentlyFav;

    setInternalFavMap((prev) => ({
      ...prev,
      [item.id]: nextState,
    }));

    try {
      const res = await toggleFavorite(item.id);
      toast.success(
        res?.message || (nextState ? "Added to favorites" : "Removed from favorites")
      );
    } catch (err) {
      setInternalFavMap((prev) => ({
        ...prev,
        [item.id]: currentlyFav,
      }));
      toast.error(
        err?.response?.data?.message || "Failed to update favorite status"
      );
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between relative overflow-hidden ${isExpanded
        ? "border-[#1B4B66]/30 shadow-md ring-1 ring-[#1B4B66]/10"
        : "border-gray-100/90 hover:border-gray-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
        }`}
    >
      {/* Top right subtle decorative accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#F8FAFC] rounded-bl-3xl border-b border-l border-gray-100/60 pointer-events-none" />

      <div className="space-y-4">
        {/* Top row: Icon + Title + Subdeck Badge + Favorite Button */}
        <div className="flex items-start justify-between gap-2">
          <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer group flex items-center gap-3 min-w-0 flex-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-700">
              {deck.icon ? (
                <Image
                  src={deck.icon}
                  alt={deck.name}
                  width={18}
                  height={18}
                  unoptimized
                  className="w-4 h-4 object-contain"
                />
              ) : (
                <Layers size={16} strokeWidth={2} className="text-[#1B4B66]" />
              )}
            </div>

            <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#1B4B66] transition-colors line-clamp-1 pr-2">
              {deck.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 z-10">
            <span
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-[11px] font-bold text-[#1B4B66] bg-[#EDF5F9] hover:bg-[#D5EBF5] px-2 py-0.5 rounded-md cursor-pointer transition-colors"
            >
              {isLoading && subcategories.length === 0
                ? "Subdecks"
                : subcategories.length > 0
                  ? `${subcategories.length} Subdecks`
                  : "Subdecks"}
            </span>
          </div>
        </div>

        {/* Dropdown / Subdecks List Content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 animate-[fadeIn_0.2s_ease]">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Select Subdeck
            </p>
            {isLoading ? (
              <div className="py-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="w-4 h-4 border-2 border-[#1B4B66] border-t-transparent rounded-full animate-spin" />
                <span>Loading subdecks...</span>
              </div>
            ) : isError ? (
              <div className="py-3 text-center text-xs text-red-400">
                Failed to load subdecks
              </div>
            ) : subcategories.length > 0 ? (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {subcategories?.map((sub) => {
                  const isSubFavItem = checkIsFav(sub.id, sub);

                  console.log("Fav sub", isSubFavItem);
                  return (
                    <div
                      key={sub.id}
                      className="group/sub flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#EDF5F9] border border-slate-100 hover:border-[#1B4B66]/30 transition-all text-left"
                    >
                      <Link
                        href={`/dashboard/flashcards/${sub.id}?type=subcategory`}
                        className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="w-5 h-5 rounded-md bg-white text-[#1B4B66] flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
                          <BookOpen size={12} strokeWidth={2.2} />
                        </div>
                        <span className="text-xs font-semibold text-gray-800 group-hover/sub:text-[#1B4B66] truncate">
                          {sub.name || sub.title || "No Name"}
                        </span>
                      </Link>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] font-bold text-[#1B4B66] bg-white px-1.5 py-0.5 rounded border border-gray-100">
                          {sub.cards_total ?? sub.card_count ?? 0} Cards
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleToggle(sub, e)}
                          className="p-1 rounded-md hover:bg-white text-[#1B4B66] transition-all cursor-pointer"
                          title={isSubFavItem ? "Remove from favorites" : "Add to favorites"}
                          aria-label="Bookmark subdeck"
                        >
                          <Bookmark
                            size={14}
                            className={
                              isSubFavItem
                                ? "fill-[#1B4B66] text-[#1B4B66]"
                                : "text-gray-300 hover:text-[#1B4B66]"
                            }
                          />
                        </button>

                        <Link
                          href={`/dashboard/flashcards/${sub.id}?type=subcategory`}
                          className="text-[#1B4B66] group-hover/sub:translate-x-0.5 transition-transform cursor-pointer"
                        >
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-3 text-center text-xs text-gray-400">
                No subdecks available
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
        <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">
          {deck?.card_count ?? "0"} Cards
        </span>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B4B66] hover:text-[#13384e] bg-[#EDF5F9] hover:bg-[#D5EBF5] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <span>{isExpanded ? "Hide Subdecks" : "See Subdecks"}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>
    </div>
  );
}
