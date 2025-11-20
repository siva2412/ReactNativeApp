export const commonRegex = {
  // 🔢 Only digits
  numbers: /^[0-9]+$/,

  // 🔤 Alphabets + spaces
  alphabets: /^[A-Za-z ]+$/,

  // 📱 Indian phone number (10 digits, starts with 6-9)
  phone: /^[6-9]\d{9}$/,

  // 📧 Email
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // 🔐 Strong password (8+ chars with A-Z, a-z, digit, special char)
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // 🧾 PAN Card (ABCDE1234F)
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,

  // 🪪 Aadhaar (12 digits)
  aadhaar: /^\d{12}$/,

  // 🔡 Username (letters, numbers, underscore)
  username: /^[a-zA-Z0-9_]+$/,

  // 🏠 Pincode (Indian)
  pincode: /^[1-9][0-9]{5}$/,

  // 🔠 No special characters
  noSpecialChars: /^[A-Za-z0-9 ]+$/,

  // 🆎 Alphanumeric (no space)
  alphanumeric: /^[A-Za-z0-9]+$/,

  // 🌐 URL
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/,
};
