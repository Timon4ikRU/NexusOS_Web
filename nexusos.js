// NexusOS Web Edition
// Created by genius 13-year-old developer!

// Система языков (БЕЗ использования currentLang в инициализации)
const LANGUAGES = {
    'ru': {
        'welcome': "Добро пожаловать в NexusOS Web Edition!",
        'boot': "Загрузка системы...",
        'prompt': "C:\\>",
        'help_title': "📋 Справка по командам",
        'help_content': `Доступные команды:
HELP    - эта справка
CLS     - очистить экран
ABOUT   - о системе
VER     - версия системы
DIR     - список файлов
COLOR   - изменить цвет
TIME    - текущее время
DATE    - текущая дата
CALC    - калькулятор
BSOD    - синий экран (осторожно!)
EXIT    - выход`,

        'about_content': `🤖 NexusOS Web Edition v1.0
⚡ Создано гениальным 13-летним разработчиком!
🎯 Полная переработка Python-версии для веба
💻 Работает в любом современном браузере`,

        'ver_content': function() { return `NexusOS Web Edition v1.0
📅 Сборка: ${new Date().toLocaleDateString()}
🌐 Платформа: Web Browser
💾 Память: ${navigator.deviceMemory || 'N/A'} GB
🔧 Язык: РУССКИЙ`; },

        'unknown_cmd': "❌ Неизвестная команда: ",
        'exit_msg': "👋 Спасибо за использование NexusOS!",
        'time_label': "🕒 Текущее время: ",
        'date_label': "📅 Текущая дата: ",
        'calc_usage': "🧮 Использование: CALC <число> <операция> <число>",
        'calc_result': "✅ Результат: ",
        'calc_error': "❌ Ошибка вычисления",
        'dir_title': "📁 Содержимое каталога C:\\",
        'dir_content': `[SYSTEM]    <DIR>          01-01-23    Системные файлы
[GAMES]     <DIR>          01-01-23    Игры        
[USERS]     <DIR>          01-01-23    Пользователи
AUTOEXEC.BAT    Файл        1,024 байт  01-01-23
CONFIG.SYS      Файл          512 байт  01-01-23
README.TXT      Файл        2,048 байт  01-01-23`,
        'dir_footer': "📊 Файлов: 3, Каталогов: 3",
        'color_usage': "🎨 Использование: COLOR <цвет>\nДоступные цвета: RED, GREEN, BLUE, CYAN, YELLOW, MAGENTA, WHITE",
        'color_changed': "✅ Цвет изменен на: ",
        'bsod_title': "💀 ПРОИЗОШЛА КРИТИЧЕСКАЯ ОШИБКА",
        'bsod_message': "NexusOS обнаружила проблему и будет перезагружена",
        'bsod_restart': "Нажмите Enter для перезагрузки..."
    },
    
    'en': {
        'welcome': "Welcome to NexusOS Web Edition!",
        'boot': "Loading system...", 
        'prompt': "C:\\>",
        'help_title': "📋 Command Help",
        'help_content': `Available commands:
HELP    - this help
CLS     - clear screen
ABOUT   - about system  
VER     - version info
DIR     - list files
COLOR   - change color
TIME    - current time
DATE    - current date
CALC    - calculator
BSOD    - blue screen (careful!)
EXIT    - exit`,

        'about_content': `🤖 NexusOS Web Edition v1.0
⚡ Created by genius 13-year-old developer!
🎯 Complete rewrite from Python to Web
💻 Works in any modern browser`,

        'ver_content': function() { return `NexusOS Web Edition v1.0
📅 Build: ${new Date().toLocaleDateString()}
🌐 Platform: Web Browser
💾 Memory: ${navigator.deviceMemory || 'N/A'} GB
🔧 Language: ENGLISH`; },

        'unknown_cmd': "❌ Unknown command: ",
        'exit_msg': "👋 Thank you for using NexusOS!",
        'time_label': "🕒 Current time: ",
        'date_label': "📅 Current date: ",
        'calc_usage': "🧮 Usage: CALC <number> <operation> <number>",
        'calc_result': "✅ Result: ",
        'calc_error': "❌ Calculation error",
        'dir_title': "📁 Directory of C:\\",
        'dir_content': `[SYSTEM]    <DIR>          01-01-23    System files
[GAMES]     <DIR>          01-01-23    Games        
[USERS]     <DIR>          01-01-23    Users
AUTOEXEC.BAT    File       1,024 bytes 01-01-23
CONFIG.SYS      File         512 bytes 01-01-23
README.TXT      File       2,048 bytes 01-01-23`,
        'dir_footer': "📊 Files: 3, Directories: 3",
        'color_usage': "🎨 Usage: COLOR <color>\nAvailable colors: RED, GREEN, BLUE, CYAN, YELLOW, MAGENTA, WHITE",
        'color_changed': "✅ Color changed to: ",
        'bsod_title': "💀 A CRITICAL ERROR OCCURRED",
        'bsod_message': "NexusOS has encountered a problem and will be restarted",
        'bsod_restart': "Press Enter to restart..."
    }
};

// Глобальные переменные системы
let currentLang = 'en';
let currentDir = "C:\\";
let currentColor = "#00ff00";
let isBsodActive = false;

// Цветовая карта
const COLOR_MAP = {
    'RED': '#ff0000',
    'GREEN': '#00ff00', 
    'BLUE': '#0000ff',
    'CYAN': '#00ffff',
    'YELLOW': '#ffff00',
    'MAGENTA': '#ff00ff',
    'WHITE': '#ffffff'
};

// Функция для получения текста с учетом языка
function getText(key) {
    const text = LANGUAGES[currentLang][key];
    return typeof text === 'function' ? text() : text;
}

// Выбор языка
function selectLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-screen').classList.add('hidden');
    document.getElementById('boot-screen').classList.remove('hidden');
    document.getElementById('boot-text').textContent = getText('boot');
    
    startBootSequence();
}

// Загрузка системы с прогресс-баром
function startBootSequence() {
    const progressBar = document.querySelector('.progress');
    let width = 0;
    
    const interval = setInterval(() => {
        width += 2;
        progressBar.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(showTerminal, 500);
        }
    }, 30);
}

// Показать терминал
function showTerminal() {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('terminal').classList.remove('hidden');
    
    addOutput("🚀 " + getText('welcome'), 'system');
    addOutput("💡 " + (currentLang === 'ru' ? "Введите HELP для списка команд" : "Type HELP for command list"), 'info');
    updatePrompt();
}

// Системные команды
const commands = {
    'HELP': function(args) {
        addOutput(getText('help_title'), 'system');
        addOutput(getText('help_content'), 'info');
    },
    
    'CLS': function(args) {
        document.getElementById('output').innerHTML = '';
    },
    
    'ABOUT': function(args) {
        addOutput("🤖 " + (currentLang === 'ru' ? "О системе NexusOS" : "About NexusOS"), 'system');
        addOutput(getText('about_content'), 'info');
    },
    
    'VER': function(args) {
        addOutput("🔧 " + (currentLang === 'ru' ? "Версия системы" : "System Version"), 'system');
        addOutput(getText('ver_content'), 'info');
    },
    
    'DIR': function(args) {
        addOutput(getText('dir_title'), 'system');
        addOutput(getText('dir_content'), 'info');
        addOutput(getText('dir_footer'), 'success');
    },
    
    'TIME': function(args) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        addOutput(getText('time_label') + time, 'success');
    },
    
    'DATE': function(args) {
        const now = new Date();
        const date = now.toLocaleDateString();
        addOutput(getText('date_label') + date, 'success');
    },
    
    'CALC': function(args) {
        if (!args) {
            addOutput(getText('calc_usage'), 'info');
            return;
        }
        
        try {
            const parts = args.split(' ');
            if (parts.length !== 3) throw new Error();
            
            const a = parseFloat(parts[0]);
            const op = parts[1];
            const b = parseFloat(parts[2]);
            
            let result;
            switch(op) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = a / b; break;
                default: throw new Error();
            }
            
            addOutput(getText('calc_result') + result, 'success');
        } catch (e) {
            addOutput(getText('calc_error'), 'error');
            addOutput(getText('calc_usage'), 'info');
        }
    },
    
    'COLOR': function(args) {
        if (!args) {
            addOutput(getText('color_usage'), 'info');
            return;
        }
        
        const color = args.toUpperCase();
        if (COLOR_MAP[color]) {
            currentColor = COLOR_MAP[color];
            document.documentElement.style.setProperty('--text-color', currentColor);
            addOutput(getText('color_changed') + color, 'success');
        } else {
            addOutput("❌ " + (currentLang === 'ru' ? "Неизвестный цвет" : "Unknown color"), 'error');
            addOutput(getText('color_usage'), 'info');
        }
    },
    
    'BSOD': function(args) {
        showBsod();
    },
    
    'EXIT': function(args) {
        addOutput(getText('exit_msg'), 'system');
        setTimeout(() => {
            document.getElementById('terminal').classList.add('hidden');
            document.getElementById('lang-screen').classList.remove('hidden');
            // Сброс цвета при выходе
            document.documentElement.style.setProperty('--text-color', '#00ff00');
            currentColor = '#00ff00';
        }, 2000);
    }
};

// Показать синий экран
function showBsod() {
    isBsodActive = true;
    const bsod = document.getElementById('bsod-screen');
    bsod.style.display = 'flex';
    bsod.innerHTML = `
        <div class="bsod-content">
            <div class="bsod-title">${getText('bsod_title')}</div>
            <div class="bsod-text">${getText('bsod_message')}</div>
            <div class="bsod-code">🚨 ОШИБКА: 0x${Math.random().toString(16).substr(2,8).toUpperCase()}</div>
            <div class="bsod-text">${getText('bsod_restart')}</div>
        </div>
    `;
    
    // Перехватываем Enter для перезагрузки
    const handler = function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            bsod.style.display = 'none';
            isBsodActive = false;
            document.removeEventListener('keypress', handler);
            document.getElementById('terminal').classList.add('hidden');
            document.getElementById('lang-screen').classList.remove('hidden');
            // Сброс при перезагрузке
            document.documentElement.style.setProperty('--text-color', '#00ff00');
            currentColor = '#00ff00';
        }
    };
    
    document.addEventListener('keypress', handler);
}

// Обработчик команд в терминале
document.getElementById('command-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const input = this.value.trim();
        const command = input.toUpperCase().split(' ')[0];
        const args = input.substring(command.length).trim();
        
        this.value = '';
        
        // Показываем введенную команду
        addOutput(currentDir + '> ' + input, 'input');
        
        if (commands[command]) {
            commands[command](args);
        } else if (command) {
            addOutput(getText('unknown_cmd') + command, 'error');
        }
        
        updatePrompt();
    }
});

// Вспомогательные функции
function addOutput(text, type = 'normal') {
    if (isBsodActive) return;
    
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.className = `output-line output-${type}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function updatePrompt() {
    document.getElementById('prompt').textContent = currentDir + '>';
}

// CSS переменная для цвета текста
document.documentElement.style.setProperty('--text-color', currentColor);

// Добавляем BSOD экран в DOM если его нет
if (!document.getElementById('bsod-screen')) {
    const bsod = document.createElement('div');
    bsod.id = 'bsod-screen';
    bsod.className = 'hidden';
    document.body.appendChild(bsod);
}

// Автофокус на поле ввода при клике в любое место терминала
document.getElementById('terminal').addEventListener('click', function() {
    document.getElementById('command-input').focus();
});

console.log("🚀 NexusOS Web Edition loaded!");
console.log("👨‍💻 Created by amazing 13-year-old developer!");
