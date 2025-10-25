// NexusOS Web Edition - FIXED VERSION
// Created by genius 13-year-old developer!

// ВРЕМЕННО убираем все let/const и используем старые var
var currentLang = 'en';
var currentDir = "C:\\";
var currentColor = "#00ff00";
var isBsodActive = false;

// Цветовая карта
var COLOR_MAP = {
    'RED': '#ff0000',
    'GREEN': '#00ff00', 
    'BLUE': '#0000ff',
    'CYAN': '#00ffff',
    'YELLOW': '#ffff00',
    'MAGENTA': '#ff00ff',
    'WHITE': '#ffffff'
};

// Система языков (УПРОЩЕННАЯ - без динамических данных)
var LANGUAGES = {
    'ru': {
        'welcome': "Добро пожаловать в NexusOS Web Edition!",
        'boot': "Загрузка системы...",
        'prompt': "C:\\>",
        'help_title': "📋 Справка по командам",
        'help_content': "Доступные команды:\nHELP - справка\nCLS - очистить экран\nABOUT - о системе\nVER - версия\nDIR - файлы\nCOLOR - цвет\nTIME - время\nDATE - дата\nCALC - калькулятор\nBSOD - синий экран\nEXIT - выход",
        'about_content': "NexusOS Web Edition v1.0\nСоздано гениальным 13-летним разработчиком!",
        'ver_content': "NexusOS Web Edition v1.0\nВеб-версия твоей крутой ОС!",
        'unknown_cmd': "Неизвестная команда: ",
        'exit_msg': "Спасибо за использование NexusOS!",
        'time_label': "Текущее время: ",
        'date_label': "Текущая дата: ",
        'calc_usage': "Использование: CALC 2 + 3",
        'calc_result': "Результат: ",
        'calc_error': "Ошибка вычисления",
        'dir_title': "Содержимое каталога C:\\",
        'dir_content': "[SYSTEM]    <DIR>\n[GAMES]     <DIR>\nREADME.TXT  Файл",
        'dir_footer': "Файлов: 1, Каталогов: 2",
        'color_usage': "Использование: COLOR RED",
        'color_changed': "Цвет изменен на: ",
        'bsod_title': "КРИТИЧЕСКАЯ ОШИБКА",
        'bsod_message': "Система будет перезагружена",
        'bsod_restart': "Нажмите Enter для перезагрузки..."
    },
    
    'en': {
        'welcome': "Welcome to NexusOS Web Edition!",
        'boot': "Loading system...", 
        'prompt': "C:\\>",
        'help_title': "Command Help",
        'help_content': "Available commands:\nHELP - help\nCLS - clear screen\nABOUT - about\nVER - version\nDIR - files\nCOLOR - color\nTIME - time\nDATE - date\nCALC - calculator\nBSOD - blue screen\nEXIT - exit",
        'about_content': "NexusOS Web Edition v1.0\nCreated by genius 13-year-old developer!",
        'ver_content': "NexusOS Web Edition v1.0\nWeb version of your awesome OS!",
        'unknown_cmd': "Unknown command: ",
        'exit_msg': "Thank you for using NexusOS!",
        'time_label': "Current time: ",
        'date_label': "Current date: ",
        'calc_usage': "Usage: CALC 2 + 3",
        'calc_result': "Result: ",
        'calc_error': "Calculation error",
        'dir_title': "Directory of C:\\",
        'dir_content': "[SYSTEM]    <DIR>\n[GAMES]     <DIR>\nREADME.TXT  File",
        'dir_footer': "Files: 1, Directories: 2",
        'color_usage': "Usage: COLOR RED",
        'color_changed': "Color changed to: ",
        'bsod_title': "CRITICAL ERROR",
        'bsod_message': "System will be restarted",
        'bsod_restart': "Press Enter to restart..."
    }
};

// Функция для получения текста
function getText(key) {
    return LANGUAGES[currentLang][key];
}

// Выбор языка
function selectLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-screen').classList.add('hidden');
    document.getElementById('boot-screen').classList.remove('hidden');
    document.getElementById('boot-text').textContent = getText('boot');
    
    startBootSequence();
}

// Загрузка системы
function startBootSequence() {
    var progressBar = document.querySelector('.progress');
    var width = 0;
    
    var interval = setInterval(function() {
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
var commands = {
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
        var now = new Date();
        var time = now.toLocaleTimeString();
        addOutput(getText('time_label') + time, 'success');
    },
    
    'DATE': function(args) {
        var now = new Date();
        var date = now.toLocaleDateString();
        addOutput(getText('date_label') + date, 'success');
    },
    
    'CALC': function(args) {
        if (!args) {
            addOutput(getText('calc_usage'), 'info');
            return;
        }
        
        try {
            var parts = args.split(' ');
            if (parts.length !== 3) throw new Error();
            
            var a = parseFloat(parts[0]);
            var op = parts[1];
            var b = parseFloat(parts[2]);
            
            var result;
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
        
        var color = args.toUpperCase();
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
        setTimeout(function() {
            document.getElementById('terminal').classList.add('hidden');
            document.getElementById('lang-screen').classList.remove('hidden');
            document.documentElement.style.setProperty('--text-color', '#00ff00');
            currentColor = '#00ff00';
        }, 2000);
    }
};

// Показать синий экран
function showBsod() {
    isBsodActive = true;
    var bsod = document.getElementById('bsod-screen');
    bsod.style.display = 'flex';
    bsod.innerHTML = '<div class="bsod-content">' +
        '<div class="bsod-title">' + getText('bsod_title') + '</div>' +
        '<div class="bsod-text">' + getText('bsod_message') + '</div>' +
        '<div class="bsod-code">ОШИБКА: 0x' + Math.random().toString(16).substr(2,8).toUpperCase() + '</div>' +
        '<div class="bsod-text">' + getText('bsod_restart') + '</div>' +
        '</div>';
    
    function handler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            bsod.style.display = 'none';
            isBsodActive = false;
            document.removeEventListener('keypress', handler);
            document.getElementById('terminal').classList.add('hidden');
            document.getElementById('lang-screen').classList.remove('hidden');
            document.documentElement.style.setProperty('--text-color', '#00ff00');
            currentColor = '#00ff00';
        }
    }
    
    document.addEventListener('keypress', handler);
}

// Обработчик команд
document.getElementById('command-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        var input = this.value.trim();
        var command = input.toUpperCase().split(' ')[0];
        var args = input.substring(command.length).trim();
        
        this.value = '';
        
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
function addOutput(text, type) {
    if (isBsodActive) return;
    
    var output = document.getElementById('output');
    var line = document.createElement('div');
    line.className = 'output-line output-' + (type || 'normal');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function updatePrompt() {
    document.getElementById('prompt').textContent = currentDir + '>';
}

// Инициализация
document.documentElement.style.setProperty('--text-color', currentColor);

if (!document.getElementById('bsod-screen')) {
    var bsod = document.createElement('div');
    bsod.id = 'bsod-screen';
    bsod.className = 'hidden';
    document.body.appendChild(bsod);
}

document.getElementById('terminal').addEventListener('click', function() {
    document.getElementById('command-input').focus();
});

// Показать синий экран (добавь эту функцию)
function showBsod() {
    isBsodActive = true;
    var bsod = document.getElementById('bsod-screen');
    if (!bsod) {
        console.error("BSOD screen element not found!");
        return;
    }
    
    bsod.style.display = 'flex';
    bsod.innerHTML = '<div class="bsod-content">' +
        '<div class="bsod-title">' + getText('bsod_title') + '</div>' +
        '<div class="bsod-text">' + getText('bsod_message') + '</div>' +
        '<div class="bsod-code">ОШИБКА: 0x' + Math.random().toString(16).substr(2,8).toUpperCase() + '</div>' +
        '<div class="bsod-text">' + getText('bsod_restart') + '</div>' +
        '</div>';
    
    function handler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            bsod.style.display = 'none';
            isBsodActive = false;
            document.removeEventListener('keypress', handler);
            document.getElementById('terminal').classList.add('hidden');
            document.getElementById('lang-screen').classList.remove('hidden');
            document.documentElement.style.setProperty('--text-color', '#00ff00');
            currentColor = '#00ff00';
        }
    }
    
    document.addEventListener('keypress', handler);
}

console.log("NexusOS Web Edition loaded!");
