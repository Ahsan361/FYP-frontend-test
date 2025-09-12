export const CATEGORY_OPTIONS = ["painting", "sculpture", "document", "other"];
export const CONDITION_OPTIONS = ["excellent", "good", "fair", "poor"];
export const STATUS_OPTIONS = ["draft", "published"];
export const EVENT_TYPES = {
  CONFERENCE: "conference",
  WORKSHOP: "workshop",
  SEMINAR: "seminar",
  EXHIBITION: "exhibition",
  OTHER: "other"
};

export const EVENT_STATUSES = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed"
};

export const TARGET_AUDIENCES = {
  STUDENTS: "students",
  RESEARCHERS: "researchers",
  PUBLIC: "public",
  PROFESSIONALS: "professionals",
  ALL: "all"
};

export const EXHIBITION_CATEGORIES = {
  ART: "art",
  HISTORY: "history",
  SCIENCE: "science",
  OTHER: "other",
};

// enums/marketplaceEnums.js
export const LISTING_TYPES = {
  AUCTION: "auction",
  FIXED: "fixed",
  RESERVE: "reserve",
};

export const LISTING_STATUSES = {
  ACTIVE: "active",
  SOLD: "sold",
  CANCELLED: "cancelled",
};


// Event Registration enums
export const REGISTRATION_STATUS_OPTIONS = ["pending", "confirmed", "cancelled"];
export const PAYMENT_STATUS_OPTIONS = ["unpaid", "paid", "refunded"];

export const REGISTRATION_STATUS_COLORS = {
  'confirmed': 'success',
  'pending': 'warning',
  'cancelled': 'error'
};

export const PAYMENT_STATUS_COLORS = {
  'paid': 'success',
  'unpaid': 'warning', 
  'refunded': 'info'
};