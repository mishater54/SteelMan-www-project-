import React, { useState } from 'react';
import './Form.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pesel: '',
    birthDate: '',
    country: '',
    city: '',
    postalCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    tshirtSize: '',
    dietaryRestrictions: '',
    medicalConditions: '',
    experience: '',
    agreeTerms: false,
    agreeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reguły walidacji
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/,
      message: 'Imię musi zawierać tylko litery (2-50 znaków)'
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/,
      message: 'Nazwisko musi zawierać tylko litery (2-50 znaków)'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 100,
      message: 'Podaj poprawny adres email'
    },
    phone: {
      required: true,
      pattern: /^(\+48)?[\s-]?[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{3}$/,
      message: 'Podaj poprawny numer telefonu (format: +48 123 456 789)'
    },
    pesel: {
      required: true,
      pattern: /^[0-9]{11}$/,
      message: 'PESEL musi zawierać dokładnie 11 cyfr'
    },
    birthDate: {
      required: true,
      message: 'Data urodzenia jest wymagana'
    },
    country: {
      required: true,
      message: 'Wybierz kraj'
    },
    city: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/,
      message: 'Miasto musi zawierać tylko litery (2-100 znaków)'
    },
    postalCode: {
      required: true,
      pattern: /^[0-9]{2}-[0-9]{3}$/,
      message: 'Kod pocztowy musi mieć format XX-XXX'
    },
    emergencyContact: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/,
      message: 'Kontakt awaryjny musi zawierać tylko litery (2-100 znaków)'
    },
    emergencyPhone: {
      required: true,
      pattern: /^(\+48)?[\s-]?[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{3}$/,
      message: 'Podaj poprawny numer telefonu kontaktu awaryjnego'
    },
    tshirtSize: {
      required: true,
      message: 'Wybierz rozmiar koszulki'
    },
    agreeTerms: {
      required: true,
      message: 'Musisz zaakceptować regulamin'
    }
  };

  // Walidacja PESEL (suma kontrolna)
  const validatePesel = (pesel) => {
    if (!/^[0-9]{11}$/.test(pesel)) return false;
    
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pesel[i]) * weights[i];
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(pesel[10]);
  };

  // Walidacja wieku (minimum 16 lat)
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  // Funkcja walidacji pola
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    // Sprawdzenie czy pole wymagane
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.message || `${name} jest wymagane`;
    }

    if (!value) return '';

    // Sprawdzenie długości minimalnej
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Minimum ${rule.minLength} znaków`;
    }

    // Sprawdzenie długości maksymalnej
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Maksimum ${rule.maxLength} znaków`;
    }

    // Sprawdzenie wzorca
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Niepoprawny format';
    }

    // Specjalna walidacja dla PESEL
    if (name === 'pesel' && !validatePesel(value)) {
      return 'Niepoprawny numer PESEL (błędna suma kontrolna)';
    }

    // Specjalna walidacja dla wieku
    if (name === 'birthDate' && !validateAge(value)) {
      return 'Musisz mieć co najmniej 16 lat';
    }

    // Specjalna walidacja dla checkboxa regulaminu
    if (name === 'agreeTerms' && !value) {
      return rule.message;
    }

    return '';
  };

  // Obsługa zmiany wartości pola
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Walidacja w czasie rzeczywistym
    const error = validateField(name, fieldValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Walidacja całego formularza
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Obsługa wysyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Symulacja wysyłania danych
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Rejestracja przebiegła pomyślnie!');
        
        // Reset formularza
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', pesel: '',
          birthDate: '', country: '', city: '', postalCode: '',
          emergencyContact: '', emergencyPhone: '', tshirtSize: '',
          dietaryRestrictions: '', medicalConditions: '', experience: '',
          agreeTerms: false, agreeNewsletter: false
        });
        setErrors({});
      } catch (error) {
        alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
      }
    }
    
    setIsSubmitting(false);
  };

  const countries = ['Poland', 'Germany', 'Czech Republic', 'Slovakia', 'Ukraine', 'Lithuania'];
  const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1 className="registration-title">REJESTRACJA</h1>
          <p className="registration-subtitle">STEELMAN POLAND 2025</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Dane osobowe */}
          <div className="form-section">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Imię *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Wprowadź imię"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Nazwisko *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Wprowadź nazwisko"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email i telefon */}
          <div className="form-section">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="przykład@email.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Telefon *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+48 123 456 789"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* PESEL i data urodzenia */}
          <div className="form-section">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">PESEL *</label>
                <input
                  type="text"
                  name="pesel"
                  value={formData.pesel}
                  onChange={handleChange}
                  maxLength="11"
                  className={`form-input ${errors.pesel ? 'error' : ''}`}
                  placeholder="12345678901"
                />
                {errors.pesel && <p className="error-message">{errors.pesel}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Data urodzenia *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`form-input ${errors.birthDate ? 'error' : ''}`}
                />
                {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
              </div>
            </div>
          </div>

          {/* Adres */}
          <div className="form-section">
            <div className="form-grid form-grid-3">
              <div className="form-group">
                <label className="form-label">Kraj *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`form-select ${errors.country ? 'error' : ''}`}
                >
                  <option value="">Wybierz kraj</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <p className="error-message">{errors.country}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Miasto *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="Wprowadź miasto"
                />
                {errors.city && <p className="error-message">{errors.city}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Kod pocztowy *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="12-345"
                  className={`form-input ${errors.postalCode ? 'error' : ''}`}
                />
                {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
              </div>
            </div>
          </div>

          {/* Kontakt awaryjny */}
          <div className="form-section">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Kontakt awaryjny *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className={`form-input ${errors.emergencyContact ? 'error' : ''}`}
                  placeholder="Imię i nazwisko osoby kontaktowej"
                />
                {errors.emergencyContact && <p className="error-message">{errors.emergencyContact}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Telefon kontaktu awaryjnego *</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className={`form-input ${errors.emergencyPhone ? 'error' : ''}`}
                  placeholder="+48 123 456 789"
                />
                {errors.emergencyPhone && <p className="error-message">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </div>

          {/* Rozmiar koszulki */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Rozmiar koszulki *</label>
              <select
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleChange}
                className={`form-select ${errors.tshirtSize ? 'error' : ''}`}
              >
                <option value="">Wybierz rozmiar</option>
                {tshirtSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              {errors.tshirtSize && <p className="error-message">{errors.tshirtSize}</p>}
            </div>
          </div>

          {/* Informacje dodatkowe */}
          <div className="form-section">
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Ograniczenia żywieniowe</label>
                <textarea
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                  placeholder="Opisz ewentualne ograniczenia żywieniowe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Problemy zdrowotne</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="3"
                  className="form-textarea"
                  placeholder="Opisz ewentualne problemy zdrowotne"
                />
              </div>
            </div>
          </div>

          {/* Doświadczenie */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Doświadczenie sportowe</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                className="form-textarea"
                placeholder="Opisz swoje doświadczenie w sporcie i zawodach tego typu"
              />
            </div>
          </div>

          {/* Zgody */}
          <div className="agreements-section">
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label className="checkbox-label">
                Akceptuję <a href="#" className="checkbox-link">regulamin zawodów</a> i 
                <a href="#" className="checkbox-link ml-1">politykę prywatności</a> *
              </label>
            </div>
            {errors.agreeTerms && <p className="error-message">{errors.agreeTerms}</p>}

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agreeNewsletter"
                checked={formData.agreeNewsletter}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label className="checkbox-label">
                Zgadzam się na otrzymywanie newslettera z informacjami o przyszłych wydarzeniach
              </label>
            </div>
          </div>

          {/* Przycisk wysyłania */}
          <div className="submit-container">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <span className="loading-spinner">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10"></circle>
                    <path className="spinner-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PRZETWARZANIE...
                </span>
              ) : (
                'ZAREJESTRUJ SIĘ →'
              )}
            </button>
          </div>

          <p className="required-note">* Pola wymagane</p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;