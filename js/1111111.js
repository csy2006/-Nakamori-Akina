document.addEventListener('DOMContentLoaded', function() {
    // 原有的导航和音乐播放器代码
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.padding = '0.5rem 0';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.padding = '1rem 0';
            }
        }
    });
    
    const audioPlayer = new Audio();
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (!playBtn || !playlistItems.length) {
        console.log('音乐播放器元素未找到，跳过初始化');
        // 不要return，继续执行留言板功能
    } else {
        let currentSongIndex = 0;
        let isPlaying = false;
        
        const songs = [
            //1
            {
                title: 'SLOW_MOTION (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/SLOW_MOTION_(2012_Remastered)_-_中森明菜.mp3',
                cover: './images/微信图片_20260117194713_568_346.jpg',
                duration: '4:05'
            },
            //2
            {
                title: 'Downtown Story (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Downtown Story 2012 Remastered-中森明菜.mp3',
                cover: './images/微信图片_20260117194713_568_346.jpg',
                duration: '4:13'
            },
            //3
            {
                title: 'Bon_Voyage (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Bon_Voyage_(2012_Remastered)_-_中森明菜.flac',
                cover: './images/微信图片_20260117194713_568_346.jpg',
                duration: '3:46'
            },
            //4
            {
                title: 'Shoio A (2014 Remastered)',
                artist: '中森明菜',
                src: 'music/shoio A_-_中森明菜.mp3',
                cover: './images/shojo A.jpg',
                duration: '3:33'
            },
            //5
            {
                title: 'Märchen Location (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Märchen Location 2012 Remastered-中森明菜.mp3',
                cover: './images/Märchen Location (2012 Remastered).jpg',
                duration: '4:37'
            },
            //6
            {
                title: 'Second Love (2014 Remastered)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/Second Love 2012 Remastered-中森明菜.mp3',
                cover: './images/select love.jpg',
                duration: '4:23'
            },
            //7
            {
                title: '1/2の神话(ライヴ・ヴァージョン)',
                artist: '中森明菜',
                src: 'music/2の神话ライヴ・ヴァージョン-中森明菜.mp3',
                cover: './images/22.jpg',
                duration: '3:47'
            },
            //8
            {
                title: '瑠璃色の夜へ',
                artist: '中森明菜',
                src: 'music/瑠璃色の夜へ_-_中森明菜.mp3',
                cover: './images/8-9.jpg',
                duration: '3:47'
            },
            //9
            {
                title: '目をとじて小旅行',
                artist: '中森明菜',
                src: 'music/目をとじて小旅行イクスカーション-中森明菜.mp3',
                cover: './images/8-9.jpg',
                duration: '3:47'
            },
            //10
            {
                title: 'Mon Amor: Glass Ni Hanbun No Tasogare',
                artist: '中森明菜',
                src: 'music/Mon Amor Glass Ni Hanbun No Tasogare-中森明菜.mp3',
                cover: './images/10.jpg',
                duration: '3:47'
            },
            //11
            {
                title: '禁区 (2022 Lacquer Master Sound)',
                artist: '中森明菜 · 2022',
                src: 'music/禁区 2022 Lacquer Master Sound-中森明菜.mp3',
                cover: './images/11.jpg',
                duration: '3:47'
            },
            //12
            {
                title: '北ウイング (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/北ウイング 2014 Remaster-中森明菜.mp3',
                cover: './images/12.jpg',
                duration: '3:47'
            },
            //13
            {
                title: '涙の形のイヤリング (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/涙の形のイヤリング 2014 Remaster-中森明菜.mp3',
                cover: './images/12.jpg',
                duration: '3:47'
            },
            //14
            {
                title: 'Southern Wind',
                artist: '中森明菜',
                src: 'music/SOUTHERN WIND-中森明菜.mp3',
                cover: './images/14.jpg',
                duration: '3:47'
            },
            //15
            {
                title: '十戒 (1984) (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/十戒 1984 [Instrumental] [2014 Remaster]-中森明菜.mp3',
                cover: './images/15.jpg',
                duration: '3:47'
            },
            //16
            {
                title: 'Kazarijanainoyo Namidaha (2012 New Mix)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Kazarijanainoyo Namidaha 2012 New Mix-中森明菜.mp3',
                cover: './images/16.jpg',
                duration: '3:47'
            },
            //17
            {
                title: 'Meu amor e... (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/Meu amor e.. Instrumental [2014 Remaster]-Akina Nakamori.mp3',
                cover: './images/17.jpg',
                duration: '3:47'
            },
            //18
            {
                title: 'SAND BEIGE~砂漠へ',
                artist: '中森明菜',
                src: 'music/SAND BEIGE -砂漠へ--中森明菜.mp3',
                cover: './images/18.jpg',
                duration: '3:47'
            },
            //19
            {
                title: 'UNSTEADY LOVE (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/UNSTEADY LOVE 2012 Remastered-中森明菜.mp3',
                cover: './images/SO_Long.jpg',
                duration: '3:47'
            },
            //20
            {
                title: 'SO_LONG',
                artist: '中森明菜',
                src: 'music/SO_LONG_-_中森明菜.flac', 
                cover: './images/SO_Long.jpg',
                duration: '4:20'
            },
            //21
            {
                title: 'APRIL STARS (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/APRIL STARS 2012 Remastered-中森明菜.mp3', 
                cover: './images/SO_Long.jpg',
                duration: '4:20'
            },
            //22
            {
                title: 'ENDLESS (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/ENDLESS 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //23
            {
                title: 'Allegro vivace (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Allegro vivace 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //24
            {
                title: 'Kanashii Romance (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Kanashii Romance 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //25
            {
                title: 'Pierce (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/Pierce 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //26
            {
                title: 'BLUE OCEAN (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/BLUE OCEAN 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //27
            {
                title: 'STAR PILOT (2012 Remastered)',
                artist: '中森明菜',
                album: '2012 Remastered',
                src: 'music/STAR PILOT 2012 Remastered-中森明菜.mp3', 
                cover: './images/22-27.jpg',
                duration: '4:20'
            },
            //28
            {
                title: 'SOLITUDE (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/SOLITUDE 2014 Remaster-中森明菜.mp3', 
                cover: './images/28.jpg',
                duration: '4:20'
            },
            //29
            {
                title: 'DESIRE -jounetsu- (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/DESIRE -jounetsu- 2014 Remaster-中森明菜.mp3', 
                cover: './images/29-30.jpg',
                duration: '4:20'
            },
            //30
            {
                title: 'LA BOHEME (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/LA BOHEME 2014 Remaster-中森明菜.mp3', 
                cover: './images/29-30.jpg',
                duration: '4:20'
            },
            //31
            {
                title: 'Gypsy Queen (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/Gypsy Queen 2014 Remaster-中森明菜.mp3', 
                cover: './images/31.jpg',
                duration: '4:20'
            },
            //32
            {
                title: 'Fin (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/Fin_-_中森明菜.mp3',
                cover: './images/fin.jpg',
                duration: '3:55'
            },
            //33
            {
                title: '危ないMON AMOUR (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/危ないMON AMOUR 2014 Remaster-中森明菜.mp3',
                cover: './images/fin.jpg',
                duration: '3:55'
            },
            //34
            {
                title: 'OH_NO,OH_YES!',
                artist: '中森明菜',
                src: 'music/OH_NO,OH_YES!_-_中森明菜.flac',
                cover: './images/34.jpg',
                duration: '3:55'
            },
            //35
            {
                title: '約束_(约定)',
                artist: '中森明菜',
                src: 'music/約束_(约定)_-_中森明菜.mp3',
                cover: './images/約束_(约定).jpg',
                duration: '3:45'
            },
            //36
            {
                title: '赤のエナメル (2012 Remastered)',
                artist: '中森明菜 · 2012 Remaster',
                src: 'music/赤のエナメル (2012 Remastered) - 中森明菜.mp3',
                cover: './images/36.jpg',
                duration: '3:55'
            },
            //37
            {
                title: 'ミック.ジャガーに微笑みを',
                artist: '中森明菜',
                src: 'music/ミック.ジャガーに微笑みを_-_中森明菜.flac',
                cover: './images/約束_(约定).jpg',
                duration: '3:55'
            },
            //38
            {
                title: 'TANGO NOIR (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/TANGO NOIR 2014 Remaster-中森明菜.mp3',
                cover: './images/38.jpg',
                duration: '3:55'
            },
            //39
            {
                title: 'BLONDE',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/BLONDE_-_中森明菜.mp3',
                cover: './images/blonde.jpg',
                duration: '3:55'
            },
            //40
            {
                title: 'MODERN WOMAN: FEMME D\'AJOURD\'HUI (2012 Remastered)',
                artist: '中森明菜 · 2012 Remaster',
                src: 'music/MODERN WOMAN FEMME D\'AJOURD\'HUI 2012 Remastered-中森明菜.mp3',
                cover: './images/40.jpg',
                duration: '3:55'
            },
            //41
            {
                title: '难破船 (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/难破船_-_中森明菜.mp3',
                cover: './images/nanpochuan.jpg',
                duration: '3:55'
            },
            //42
            {
                title: 'AL-MAUJ (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/AL-MAUJ_-_中森明菜.mp3',
                cover: './images/42.jpg',
                duration: '3:55'
            },
            //43
            {
                title: 'FIRE STARTER (2012 Remastered)',
                artist: '中森明菜 · 2012 Remaster',
                src: 'music/FIRE STARTER 2012 Remastered-中森明菜.mp3',
                cover: './images/43.jpg',
                duration: '3:55'
            },
            //44
            {
                title: 'TATTOO (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/TATTOO_-_中森明菜.mp3',
                cover: './images/44.jpg',
                duration: '3:55'
            },
            //45
            {
                title: 'I MISSED "THE SHOCK" (我已错过这次“冲击”) (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/I_MISSED_“THE_SHOCK__(2014_Remaster)_-_中森明菜.mp3',
                cover: './images/45.jpg',
                duration: '3:55'
            },
            //46
            {
                title: 'LIAR (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/LIAR 2014 Remaster-中森明菜.mp3',
                cover: './images/46.jpg',
                duration: '3:55'
            },
            //47
            {
                title: 'Sayonara Ja Owaranai (2012 Remastered)',
                artist: '中森明菜 · 2012 Remaster',
                src: 'music/Sayonara Ja Owaranai 2012 Remastered-中森明菜.mp3',
                cover: './images/47-48.jpg',
                duration: '3:55'
            },
            //48
            {
                title: 'Standing In Blue (2012 Remastered)',
                artist: '中森明菜 · 2012 Remastered',
                src: 'music/Standing In Blue 2012 Remastered-中森明菜.flac', 
                cover: './images/47-48.jpg',
                duration: '4:20'
            },
            //49
            {
                title: 'Dear Friend (2014 Remaster)',
                artist: '中森明菜 · 2014 Remaster',
                src: 'music/Dear Friend 2014 Remaster-中森明菜.mp3', 
                cover: './images/49-50.jpg',
                duration: '4:20'
            },
            //50
            {
                title: 'CARIBBEAN (2014 Remaster)',
                artist: '中森明菜',
                src: 'music/CARIBBEAN-中森明菜.flac',
                cover: './images/49-50.jpg',
                duration: '3:55'
            },
            //51
            {
                title: '二人静-「天河伝説殺人事件」より (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/二人静-「天河伝説殺人事件」より 2014 Remaster-中森明菜.mp3',
                cover: './images/51-52.jpg',
                duration: '3:55'
            },
            //52
            {
                title: '忘れて... (2014 Remaster)',
                artist: '中森明菜',
                album: '2014 Remastered',
                src: 'music/忘れて.. 2014 Remaster-中森明菜.mp3',
                cover: './images/51-52.jpg',
                duration: '3:55'
            },
            //53
            {
                title: '愛撫',
                artist: '中森明菜',
                src: 'music/愛撫-中森明菜.mp3',
                cover: './images/53.jpg',
                duration: '3:55'
            },
            //54
            {
                title: 'Everlasting Love',
                artist: '中森明菜',
                src: 'music/Everlasting Love-中森明菜-2.mp3',
                cover: './images/54-58.jpg',
                duration: '3:55'
            },
            //55
            {
                title: '夜のどこかで~night shift~',
                artist: '中森明菜',
                src: 'music/夜のどこかで~night shift~-中森明菜.mp3',
                cover: './images/54-58.jpg',
                duration: '3:55'
            },
            //56
            {
                title: '今夜、流れ星',
                artist: '中森明菜',
                src: 'music/今夜、流れ星-中森明菜.mp3',
                cover: './images/54-58.jpg',
                duration: '3:55'
            },
            //57
            {
                title: 'Good-bye My Tears',
                artist: '中森明菜',
                src: 'music/Good-bye My Tears-中森明菜.mp3',
                cover: './images/54-58.jpg',
                duration: '3:55'
            },
            //58
            {
                title: "It's brand new day",
                artist: '中森明菜',
                src: 'music/It\'s brand new day-中森明菜.mp3',
                cover: './images/54-58.jpg',
                duration: '3:55'
            },
        ];
        
        function formatTime(seconds) {
            if (isNaN(seconds) || seconds < 0) {
                return '0:00';
            }
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        function updateTimeDisplay() {
            if (!audioPlayer) return;
            
            const current = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            
            currentTimeEl.textContent = formatTime(current);
            
            if (!isNaN(duration) && duration > 0 && isFinite(duration)) {
                durationEl.textContent = formatTime(duration);
            } else {
                durationEl.textContent = '0:00';
            }
        }
        
        function loadSong(index) {
            if (index < 0 || index >= songs.length) return;
            
            currentSongIndex = index;
            audioPlayer.src = songs[index].src;
            
            document.querySelector('.song-info h3').textContent = songs[index].title;
             if (songs[index].album) {
                document.querySelector('.song-info p').textContent = `${songs[index].artist} · ${songs[index].album}`;
            } else {
                document.querySelector('.song-info p').textContent = songs[index].artist;
            }
            document.querySelector('.album-art img').src = songs[index].cover;
            
            playlistItems.forEach(item => item.classList.remove('active'));
            playlistItems[index].classList.add('active');
            
            progress.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            durationEl.textContent = '0:00';
            
            const onLoadedMetadata = () => {
                if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
                    durationEl.textContent = formatTime(audioPlayer.duration);
                }
                audioPlayer.removeEventListener('loadedmetadata', onLoadedMetadata);
            };
            
            audioPlayer.addEventListener('loadedmetadata', onLoadedMetadata);
            
            if (isPlaying) {
                audioPlayer.play().catch(e => {
                    console.log('自动播放被阻止:', e);
                });
            }
        }

        function playPause() {
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                if (!audioPlayer.src) {
                    loadSong(currentSongIndex);
                }
                audioPlayer.play().catch(e => {
                    console.log('播放失败:', e);
                });
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        }
        
        function updateProgress() {
            if (!audioPlayer) return;
            
            const current = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            
            if (!isNaN(duration) && duration > 0) {
                const progressPercent = (current / duration) * 100;
                progress.style.width = `${progressPercent}%`;
            }
            
            updateTimeDisplay();
        }

        function setProgress(e) {
            if (!audioPlayer || isNaN(audioPlayer.duration) || audioPlayer.duration <= 0) return;
            
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
        }

        function setVolume() {
            if (audioPlayer && volumeSlider) {
                audioPlayer.volume = volumeSlider.value;
            }
        }

        playBtn.addEventListener('click', playPause);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong);
        
        if (progressBar) {
            progressBar.addEventListener('click', setProgress);
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', setVolume);
            audioPlayer.volume = volumeSlider.value; // 初始化音量
        }

        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                if (!isPlaying) {
                    playPause();
                }
            });
        });

        loadSong(currentSongIndex);
    }

    const messageForm = document.getElementById('message-form');
    const fanMessages = document.querySelector('.fan-messages');

    if (!messageForm || !fanMessages) {
        console.error('留言板元素未找到');
        return;
    }

    loadMessages();

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (!nameInput || !emailInput || !messageInput) {
            console.error('表单输入框未找到');
            return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        console.log('表单数据:', { name, email, message }); // 调试用
        
        // 改进的验证逻辑
        if (!name) {
            alert('请输入姓名');
            nameInput.focus();
            return;
        }
        
        if (!message) {
            alert('请输入留言内容');
            messageInput.focus();
            return;
        }
        
        // 邮箱验证（可选）
        if (email && !isValidEmail(email)) {
            alert('请输入有效的邮箱地址');
            emailInput.focus();
            return;
        }
        
        // 创建新留言
        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleDateString('zh-CN'),
            timestamp: new Date().toISOString()
        };
        
        // 保存留言
        saveMessage(newMessage);
        
        // 清空表单
        messageForm.reset();
        
        // 显示成功提示
        showMessage('留言提交成功！', 'success');
    });
    
    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 保存留言到本地存储
    function saveMessage(message) {
        try {
            let messages = JSON.parse(localStorage.getItem('akinaMessages')) || [];
            messages.push(message);
            localStorage.setItem('akinaMessages', JSON.stringify(messages));
            loadMessages(); // 重新加载显示
        } catch (error) {
            console.error('保存留言失败:', error);
            showMessage('保存留言失败，请重试', 'error');
        }
    }
    
    // 从本地存储加载留言
    function loadMessages() {
        try {
            const messages = JSON.parse(localStorage.getItem('akinaMessages')) || [];
            
            // 清空动态添加的留言（保留前三个示例留言）
            const existingMessages = fanMessages.querySelectorAll('.message-item');
            for (let i = 3; i < existingMessages.length; i++) {
                if (existingMessages[i]) {
                    existingMessages[i].remove();
                }
            }
            
            const messagesToShow = messages.slice(-10000000);

    messagesToShow.forEach(message => {
        const existingMessage = fanMessages.querySelector(`[data-message-id="${message.id}"]`);
        if (!existingMessage) {
            const messageElement = createMessageElement(message);
            // 追加到留言列表末尾
            fanMessages.appendChild(messageElement);
        }
    });

    // 更新留言计数
    updateMessageCount();
        } catch (error) {
            console.error('加载留言失败:', error);
        }
    }
    
    // 更新留言计数
    function updateMessageCount() {
        const messageCount = document.getElementById('message-count');
        if (messageCount) {
            const totalMessages = fanMessages.querySelectorAll('.message-item').length;
            messageCount.textContent = totalMessages;
        }
    }
    
    // 创建留言DOM元素
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';
        messageDiv.setAttribute('data-message-id', message.id);
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="message-author">${escapeHtml(message.name)}</span>
                <span class="message-date">${message.date}</span>
                <button class="delete-btn" onclick="deleteMessage(${message.id})" title="删除留言">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p>${escapeHtml(message.message)}</p>
            ${message.email ? `<div class="message-email">${escapeHtml(message.email)}</div>` : ''}
        `;
        
        return messageDiv;
    }
    
    // HTML转义函数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 显示提示信息
    function showMessage(text, type) {
        const existingAlert = document.querySelector('.message-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `message-alert message-${type}`;
        alertDiv.textContent = text;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 3000);
    }
});

// 删除留言函数（全局可访问）
function deleteMessage(messageId) {
    if (!confirm('确定要删除这条留言吗？')) {
        return;
    }
    
    try {
        let messages = JSON.parse(localStorage.getItem('akinaMessages')) || [];
        messages = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem('akinaMessages', JSON.stringify(messages));
        
        // 从DOM中移除
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            messageElement.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                    // 更新留言计数
                    const messageCount = document.getElementById('message-count');
                    if (messageCount) {
                        const totalMessages = document.querySelectorAll('.message-item').length;
                        messageCount.textContent = totalMessages;
                    }
                }
            }, 300);
        }
        
        // 显示删除成功提示
        showMessage('留言删除成功！', 'success');
    } catch (error) {
        console.error('删除留言失败:', error);
        showMessage('删除留言失败', 'error');
    }
}

// 全局显示消息函数
function showMessage(text, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message-alert message-${type}`;
    alertDiv.textContent = text;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 3000);
}