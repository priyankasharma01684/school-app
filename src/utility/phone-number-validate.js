import libphonenumber from 'google-libphonenumber';

function PhoneNumberValidate() {
  const PNF = libphonenumber.PhoneNumberFormat;

  // Create an instance of PhoneNumberUtil
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

  const NumberStr = '202-456-2121';

  try {
  // Parse number with US country code and keep raw input
    const number = phoneUtil.parseAndKeepRawInput(NumberStr, 'US');
  } catch (e) {
    alert(`NumberParseException was thrown: ${e.toString()}`);
  }
}
export default PhoneNumberValidate;
