import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import styles from './Login.module.css';
import { getUserByEmail } from '../../api/http';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const users = await getUserByEmail(normalizedEmail);

      if (users.length === 0) {
        setErrors({ general: 'Користувача з таким email не знайдено.' });
        return;
      }

      const user = users[0];
      if (user.password !== formData.password) {
        setErrors({ general: 'Невірний пароль.' });
        return;
      }

      sessionStorage.setItem('currentUser', JSON.stringify({ id: user.id, email: user.email }));

      const redirectTo = location.state?.from;
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      setErrors({ general: 'Помилка входу. Спробуйте ще раз.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign In</h1>
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
                placeholder="example@gmail.com"
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

            {errors.general && (
              <div className={styles.generalError}>{errors.general}</div>
            )}

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? <span className={styles.loadingText}>Signing In...</span> : 'Sign In'}
            </button>

            <div className={styles.footer}>
              <span className={styles.footerText}>Don't have an account? </span>
              <Link to="/signup" state={{ from: location.state?.from || '/' }} className={styles.footerLink}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;