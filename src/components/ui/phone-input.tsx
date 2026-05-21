import "intl-tel-input/dist/css/intlTelInput.css"
import "./phone-input.css"
import IntlTelInput from "intl-tel-input/reactWithUtils"

export function PhoneInput({
  id,
  onChangeNumber,
  invalid,
}: {
  id?: string
  onChangeNumber?: (number: string) => void
  invalid?: boolean
}) {
  return (
    <div className={`phone-input-wrapper${invalid ? " phone-input-invalid" : ""}`}>
      <IntlTelInput
        initialCountry="ae"
        separateDialCode={true}
        onChangeNumber={onChangeNumber}
        inputProps={{
          id,
          className: "phone-input-field",
          placeholder: "Phone number",
        }}
      />
    </div>
  )
}
