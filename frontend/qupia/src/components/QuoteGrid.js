import React, { useState, useRef, useEffect } from 'react';

const QuoteCipher = ({ quotes = "ПР*ГРА**ИР*ВА*ИЕ ЭТ* ИС*УССТВ*", hints = [12, 3, 4, 5, 3, 6, 7, 7, 8, 3, 4, 9, 6, 10, 8, 11, 12, 13, 14, 15, 16, 17, 8, 18, 19, 20, 18, 21, 9, 6], result = "ПРОГРАММИРОВАНИЕ ЭТО ИСКУССТВО" }) => {
  // hints уже массив, не нужно split
  const hintsArray = Array.isArray(hints) ? hints : [];
  
  // Состояние для выбранного инпута
  const [selectedInput, setSelectedInput] = useState(null);
  
  // Состояние для введенных значений
  const [inputs, setInputs] = useState({});
  
  // Состояние для правильных ответов (заблокированных)
  const [correctInputs, setCorrectInputs] = useState({});
  
  // Состояние для уведомления об ошибке
  const [errorMessage, setErrorMessage] = useState('');
  
  // Рефы для инпутов
  const inputRefs = useRef({});

  // Получаем список индексов всех инпутов
  const getInputIndices = () => {
    return quotes.split('').map((char, index) => char === '*' ? index : null).filter(i => i !== null);
  };

  // Обработчик изменения инпута
  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    const lowerValue = value.toLowerCase();
    
    // Проверяем правильность с result
    const resultChar = result[index].toLowerCase();
    
    if (lowerValue === resultChar) {
      // Правильный ответ!
      setCorrectInputs(prev => ({
        ...prev,
        [index]: lowerValue
      }));
      
      setInputs(prev => ({
        ...prev,
        [index]: lowerValue
      }));
      
      // Переходим к следующему инпуту
      const inputIndices = getInputIndices();
      const currentPosition = inputIndices.indexOf(index);
      if (currentPosition !== -1 && currentPosition < inputIndices.length - 1) {
        const nextIndex = inputIndices[currentPosition + 1];
        setTimeout(() => {
          if (inputRefs.current[nextIndex]) {
            inputRefs.current[nextIndex].focus();
          }
        }, 100);
      }
      
      // Убираем ошибку если была
      setErrorMessage('');
    } else if (lowerValue !== '') {
      // Неправильный ответ
      setErrorMessage('Неправильная буква!');
      setTimeout(() => setErrorMessage(''), 2000);
      
      // Очищаем инпут
      setInputs(prev => ({
        ...prev,
        [index]: ''
      }));
    } else {
      // Пустое значение
      setInputs(prev => ({
        ...prev,
        [index]: ''
      }));
    }
  };

  // Обработчик фокуса
  const handleFocus = (index) => {
    setSelectedInput(index);
  };

  // Обработчик потери фокуса
  const handleBlur = () => {
    setSelectedInput(null);
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(to bottom right, #e0e7ff, #fce7f3)'
    },
    errorNotification: {
      position: 'fixed',
      top: '2rem',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontWeight: '600',
      animation: 'slideDown 0.3s ease-out',
      zIndex: 1000
    },
    container: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      width: '100%'
    },
    quoteContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem',
      justifyContent: 'center'
    },
    letterBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.15rem',
      minHeight: '3.5rem'
    },
    letter: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#1f2937',
      minWidth: '1.5rem',
      height: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    input: {
      width: '1.5rem',
      height: '1.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '2px solid #a5b4fc',
      borderRadius: '0.25rem',
      outline: 'none',
      transition: 'all 0.2s',
      padding: 0
    },
    inputSelected: {
      width: '1.5rem',
      height: '1.5rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      border: '2px solid #22c55e',
      borderRadius: '0.25rem',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: '#dcfce7',
      boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.2)',
      padding: 0
    },
    inputCorrect: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#1f2937',
      minWidth: '1.5rem',
      height: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: 'none',
      background: 'none'
    },
    dash: {
      fontSize: '0.75rem',
      color: '#6b7280',
      fontWeight: 'bold'
    },
    hint: {
      fontSize: '0.625rem',
      fontWeight: '600',
      color: '#4f46e5',
      backgroundColor: '#e0e7ff',
      padding: '0.125rem 0.25rem',
      borderRadius: '0.25rem',
      minWidth: '1rem',
      textAlign: 'center'
    },
    space: {
      width: '0.5rem'
    }
  };

  return (
    <div style={styles.pageContainer}>
      {errorMessage && (
        <div style={styles.errorNotification}>
          {errorMessage}
        </div>
      )}
      
      <div style={styles.container}>
        <div style={styles.quoteContainer}>
          {quotes.split('').map((char, index) => {
            // Если это пробел
            if (char === ' ') {
              return <div key={index} style={styles.space} />;
            }
            
            // Если это звездочка - создаем инпут
            if (char === '*') {
              const isSelected = selectedInput === index;
              const isCorrect = correctInputs[index] !== undefined;
              
              return (
                <div key={index} style={styles.letterBox}>
                  {isCorrect ? (
                    // Показываем как обычную букву если правильно
                    <div style={styles.inputCorrect}>{correctInputs[index]}</div>
                  ) : (
                    // Показываем инпут если еще не угадано
                    <input
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={inputs[index] || ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onFocus={() => handleFocus(index)}
                      onBlur={handleBlur}
                      style={isSelected ? styles.inputSelected : styles.input}
                    />
                  )}
                  <div style={styles.dash}>--</div>
                  <div style={styles.hint}>{hintsArray[index] || ''}</div>
                </div>
              );
            }
            
            // Обычная буква
            return (
              <div key={index} style={styles.letterBox}>
                <div style={styles.letter}>{char}</div>
                <div style={styles.dash}>--</div>
                <div style={styles.hint}>{hintsArray[index] || ''}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuoteCipher;