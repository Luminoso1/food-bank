export const PROMPT = `
Return ONLY ONE JSON object.

NO arrays.
NO extra keys.
NO explanations.
NO markdown.

If multiple people exist, return ONLY the first one.

Format:
{
  "lastNames": "",
  "names": "",
  "dni": "",
  "address": "",
  "primaryPhoneNumber": "",
  "secondaryPhoneNumber": "",
  "email": "",
  "notes": "",
  "id": null,
  "isActive": true
}

Rules:
- ALL values are strings except isActive (boolean) and id (null)
- Use "" if missing
- Uppercase lastNames and names
- digits only for dni and phones
- remove symbols/spaces from numbers
`
