import parsePhoneNumber from 'libphonenumber-js'

export function formatPhone(phone, country = 'US') {
  try {
    const parsed = parsePhoneNumber(phone, country);
    return parsed.formatNational(); // e.g., (123) 456-7890
  } catch {
    return phone; // fallback if formatting fails
  }
}
