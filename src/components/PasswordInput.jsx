import "./PasswordInput.css";

function PasswordInput({ placeholder, value, onChange, required }) {
  return (
    <div className="password-wrapper">
      <span className="password-icon-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
          <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        </svg>
      </span>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="password-input"
      />
    </div>
  );
}

export default PasswordInput;
