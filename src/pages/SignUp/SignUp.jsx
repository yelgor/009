import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import styles from './SignUp.module.css';
import { getUserByEmail, createUser } from '../../api/http';
import { useAuth } from '../../context/AuthContext.jsx';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!normalizedEmail) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      newErrors.email = 'Please enter a valid email';
    } else if (!normalizedEmail.endsWith('@ucu.edu.ua')) {
      newErrors.email = 'Реєстрація доступна лише з поштою @ucu.edu.ua';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const normalizedEmail = formData.email.trim().toLowerCase();

      const existing = await getUserByEmail(normalizedEmail);
      if (existing.length > 0) {
        setErrors({ email: 'Користувач з таким email вже існує.' });
        return;
      }

      const createdUser = await createUser({ email: normalizedEmail, password: formData.password });

      setCurrentUser({ id: createdUser.id, email: createdUser.email });

      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrors({ general: 'Помилка реєстрації. Спробуйте ще раз.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign Up</h1>
            <div className={styles.divider}></div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name.surname@ucu.edu.ua"
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                disabled={isLoading}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                disabled={isLoading}
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Re-enter password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                disabled={isLoading}
              />
              {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            {errors.general && <div className={styles.generalError}>{errors.general}</div>}

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Реєстрація...' : 'Create Account'}
            </button>

            <div className={styles.footer}>
              <span className={styles.footerText}>Already have an account? </span>
              <Link to="/login" state={{ from: location.state?.from || '/' }} className={styles.footerLink}>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;