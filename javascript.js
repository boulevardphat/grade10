   // PHẦN 1: SLIDER ẢNH
        (function() {
            const imageList = [
                "lop10/anh/khaigiang.png",
                "lop10/anh/2011.png",
                "lop10/anh/tongket.png"
            ];
            
            let currentImageIndex = 0;
            const mainImage = document.getElementById('main-image');
            const currentImgSpan = document.getElementById('current-img');
            const totalImgsSpan = document.getElementById('total-imgs');
            
            if (mainImage && currentImgSpan && totalImgsSpan) {
                totalImgsSpan.textContent = imageList.length;
                
                function updateImageCounter() {
                    currentImgSpan.textContent = currentImageIndex + 1;
                }
                
                document.getElementById('next-btn')?.addEventListener('click', function() {
                    currentImageIndex = (currentImageIndex + 1) % imageList.length;
                    mainImage.src = imageList[currentImageIndex];
                    updateImageCounter();
                });
                
                document.getElementById('prev-btn')?.addEventListener('click', function() {
                    currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
                    mainImage.src = imageList[currentImageIndex];
                    updateImageCounter();
                });
                
                mainImage.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02)';
                });
                
                mainImage.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
                
                let autoSlideInterval = setInterval(function() {
                    currentImageIndex = (currentImageIndex + 1) % imageList.length;
                    mainImage.src = imageList[currentImageIndex];
                    updateImageCounter();
                }, 5000);
                
                const imageContainer = document.querySelector('.fullscreen-image-container');
                imageContainer?.addEventListener('mouseenter', function() {
                    clearInterval(autoSlideInterval);
                });
                
                imageContainer?.addEventListener('mouseleave', function() {
                    autoSlideInterval = setInterval(function() {
                        currentImageIndex = (currentImageIndex + 1) % imageList.length;
                        mainImage.src = imageList[currentImageIndex];
                        updateImageCounter();
                    }, 5000);
                });
            }
        })();

        // PHẦN 2: QUOTE ANIMATION
        document.addEventListener('DOMContentLoaded', function() {
            const quoteSection = document.querySelector('.quote-section');
            const words = document.querySelectorAll('.word');
            let animationStarted = false;
            let animationSpeed = 120;

            if (quoteSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !animationStarted) {
                            quoteSection.classList.add('visible');
                            startWordAnimation();
                            animationStarted = true;
                        }
                    });
                }, { threshold: 0.3 });

                observer.observe(quoteSection);

                function startWordAnimation() {
                    words.forEach(word => {
                        word.classList.remove('active', 'highlight');
                    });

                    animateLine('.line1 .word', 0, function() {
                        animateLine('.line2 .word', 0);
                    });
                }

                function animateLine(selector, index, callback) {
                    const lineWords = document.querySelectorAll(selector);
                    
                    if (index < lineWords.length) {
                        lineWords[index].classList.add('active');
                        
                        setTimeout(() => {
                            lineWords[index].classList.add('highlight');
                            
                            setTimeout(() => {
                                lineWords[index].classList.remove('highlight');
                                
                                setTimeout(() => {
                                    animateLine(selector, index + 1, callback);
                                }, animationSpeed);
                            }, 150);
                        }, 100);
                    } else if (callback) {
                        setTimeout(callback, 300);
                    }
                }
            }
        });

        // PHẦN 3: POLAROID SECTION OBSERVER
        document.addEventListener('DOMContentLoaded', function() {
            const polaroidSection = document.querySelector('.polaroid-section');
            if (polaroidSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            polaroidSection.classList.add('visible');
                        }
                    });
                }, { threshold: 0.2 });
                
                observer.observe(polaroidSection);
            }
        });

        // PHẦN 4: SCROLL REVEAL CHO TẤT CẢ CÁC SECTION
        document.addEventListener('DOMContentLoaded', function() {
            // Observer cho các section có class .section-fade
            const fadeSections = document.querySelectorAll('.section-fade');
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, { threshold: 0.2 });

            fadeSections.forEach(section => fadeObserver.observe(section));

            // Observer cho các phần tử có class .scroll-reveal
            const reveals = document.querySelectorAll('.scroll-reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.15 });

            reveals.forEach(el => revealObserver.observe(el));

            // Observer cho journal-section
            const journalSection = document.querySelector('.journal-section');
            if (journalSection) {
                const journalObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.2 });
                
                journalObserver.observe(journalSection);
            }
        });

 <!-- JAVASCRIPT RIÊNG CHO PHẦN 9 (HIỆU ỨNG SCROLL) -->
  
        (function() {
            // Đợi DOM load xong
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initElegantSection);
            } else {
                initElegantSection();
            }

            function initElegantSection() {
                const elegantSection = document.getElementById('elegant-section');
                
                if (!elegantSection) return;

                // Observer để phát hiện khi section xuất hiện
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            
                            // Thêm hiệu ứng cho các phần tử con
                            const header = entry.target.querySelector('.elegant-header');
                            const leftCol = entry.target.querySelector('.elegant-left');
                            const rightCol = entry.target.querySelector('.elegant-right');
                            
                            if (header) {
                                header.style.transitionDelay = '0.1s';
                            }
                            if (leftCol) {
                                leftCol.style.transitionDelay = '0.3s';
                            }
                            if (rightCol) {
                                rightCol.style.transitionDelay = '0.5s';
                            }
                        }
                    });
                }, {
                    threshold: 0.2,
                    rootMargin: '0px'
                });

                observer.observe(elegantSection);

                // Thêm hiệu ứng hover cho ảnh
                const gridItems = document.querySelectorAll('.elegant-grid-item');
                gridItems.forEach((item, index) => {
                    item.addEventListener('mouseenter', function() {
                        this.style.transitionDelay = '0s';
                    });
                });
            }
        })();
    
 document.addEventListener('DOMContentLoaded', function() {
            const thanhlichSection = document.getElementById('thanhlich-section');
            
            if (!thanhlichSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('thanhlich-visible');
                        
                        // Animation cho các phần tử
                        const title = entry.target.querySelector('.thanhlich-title');
                        const subtitle = entry.target.querySelector('.thanhlich-subtitle');
                        const year = entry.target.querySelector('.thanhlich-year');
                        const leftCol = entry.target.querySelector('.thanhlich-left');
                        const rightCol = entry.target.querySelector('.thanhlich-right');
                        
                        if (subtitle) subtitle.style.animation = 'fadeInDown 0.8s ease forwards';
                        if (title) title.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
                        if (year) year.style.animation = 'fadeInUp 0.8s ease 0.4s forwards';
                        if (leftCol) leftCol.style.animation = 'fadeInLeft 1s ease 0.6s forwards';
                        if (rightCol) rightCol.style.animation = 'fadeInRight 1s ease 0.8s forwards';
                    }
                });
            }, {
                threshold: 0.2
            });

            observer.observe(thanhlichSection);

            // Thêm keyframes nếu chưa có
            if (!document.querySelector('#thanhlich-keyframes')) {
                const style = document.createElement('style');
                style.id = 'thanhlich-keyframes';
                style.textContent = `
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes fadeInLeft {
                        from {
                            opacity: 0;
                            transform: translateX(-50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    
                    @keyframes fadeInRight {
                        from {
                            opacity: 0;
                            transform: translateX(50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    
                    .thanhlich-title, .thanhlich-subtitle, .thanhlich-year, 
                    .thanhlich-left, .thanhlich-right {
                        opacity: 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });


   document.addEventListener('DOMContentLoaded', function() {
            const hauTruongSection = document.getElementById('hau-truong-section');
            
            if (!hauTruongSection) return;

            // Observer cho hiệu ứng scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animation cho grid items
                        const gridItems = entry.target.querySelectorAll('.grid-item');
                        gridItems.forEach((item, index) => {
                            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                        });
                        
                        // Animation cho stickers
                        const stickers = entry.target.querySelectorAll('.sticker');
                        stickers.forEach((sticker, index) => {
                            sticker.style.animation = `popIn 0.5s ease ${index * 0.1 + 0.5}s forwards`;
                        });
                    }
                });
            }, {
                threshold: 0.2
            });

            observer.observe(hauTruongSection);

            // Thêm keyframes animation
            if (!document.querySelector('#hau-truong-keyframes')) {
                const style = document.createElement('style');
                style.id = 'hau-truong-keyframes';
                style.textContent = `
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes popIn {
                        0% {
                            opacity: 0;
                            transform: scale(0);
                        }
                        80% {
                            transform: scale(1.2);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    
                    .grid-item, .sticker {
                        opacity: 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });



  document.addEventListener('DOMContentLoaded', function() {
            const traidinhSection = document.getElementById('traidinh-section');
            
            if (!traidinhSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animation cho các cột
                        const cols = entry.target.querySelectorAll('.traidinh-col');
                        cols.forEach((col, index) => {
                            col.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
                        });
                        
                        // Animation cho stickers
                        const stickers = entry.target.querySelectorAll('.decorative-stickers .sticker');
                        stickers.forEach((sticker, index) => {
                            sticker.style.animation = `popIn 0.5s ease ${0.8 + index * 0.1}s forwards`;
                        });
                    }
                });
            }, {
                threshold: 0.2
            });

            observer.observe(traidinhSection);

            // Thêm keyframes animation
            if (!document.querySelector('#traidinh-keyframes')) {
                const style = document.createElement('style');
                style.id = 'traidinh-keyframes';
                style.textContent = `
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes popIn {
                        0% {
                            opacity: 0;
                            transform: scale(0.3);
                        }
                        80% {
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    
                    .traidinh-col, .decorative-stickers .sticker {
                        opacity: 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });

    document.addEventListener('DOMContentLoaded', function() {
            const tetSection = document.getElementById('tet-section');
            
            if (!tetSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        const title = entry.target.querySelector('.tet-title');
                        const desc = entry.target.querySelector('.tet-description');
                        const decorations = entry.target.querySelectorAll('.decoration-item');
                        
                        if (title) {
                            title.style.animation = 'fadeInDown 0.8s ease forwards';
                        }
                        
                        if (desc) {
                            desc.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
                        }
                        
                        decorations.forEach((item, index) => {
                            item.style.animation = `popIn 0.5s ease ${0.4 + index * 0.1}s forwards`;
                        });
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(tetSection);

            // Thêm keyframes animation nếu chưa có
            if (!document.querySelector('#tet-keyframes')) {
                const style = document.createElement('style');
                style.id = 'tet-keyframes';
                style.textContent = `
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-40px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(40px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes popIn {
                        0% {
                            opacity: 0;
                            transform: scale(0);
                        }
                        80% {
                            transform: scale(1.1);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    
                    .tet-title, .tet-description, .decoration-item {
                        opacity: 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });

// Data - Thông tin kỷ niệm (có thể chỉnh sửa dễ dàng)
const memoriesData = {
  1: {
    title: "Lễ Khai Giảng Năm Học",
    description: "Khai giảng: Ngày khai giảng đầu tiên của năm cấp 3 để lại trong tụi mình rất nhiều cảm xúc khó quên. Sân trường hôm ấy rộn ràng tiếng cười nói của những gương mặt còn lạ lẫm nhưng đầy háo hức. Khi ấy, mỗi lớp 10 sẽ có một câu slogan riêng, và lớp mình đã thống nhất thông điệp của bạn Trí ngay khi được đề cập, đó là: “We are the best, we learn, we grow, we ace the test.” Khi đồng thanh hô vang câu khẩu hiệu ấy, dường như tất cả mọi người đều cảm nhận rõ tinh thần đoàn kết và quyết tâm của cả tập thể mà cười phá lên. Đó không chỉ là lời khẳng định niềm tin vào bản thân mà còn là lời hứa sẽ cùng nhau học tập, trưởng thành và chinh phục những thử thách phía trước. Ngày khai giảng ấy thực sự đã mở ra một hành trình mới, đầy hy vọng và ước mơ của tuổi học trò."
  },
  2: {
    title: "Ngày Đầu Tiên Làm Quen",
    description: "Những buổi tự giới thiệu đầu tiên, còn ngại ngùng và rụt rè. Ai cũng cố gắng ghi nhớ tên bạn, tìm hiểu sở thích của nhau."
  },
  3: {
    title: "Tết Trung Thu Cùng Lớp",
    description: "Buổi trung thu ấm cúng với đèn lồng, bánh trung thu và những trò chơi dân gian vui nhộn. Cả lớp cùng quây quần, cười đùa."
  },
  4: {
    title: "Sinh Nhật Tập Thể",
    description: "Những bữa tiệc sinh nhật bất ngờ cho các bạn trong lớp. Từ việc chuẩn bị quà, trang trí lớp học lén lút, đến giây phút tắt đèn hát mừng sinh nhật."
  },
  5: {
    title: "Giải Thể Thao",
    description: "Những trận bóng đá, bóng chuyền đầy kịch tính. Cả lớp cùng cổ vũ nhiệt tình cho đội tuyển của mình."
  },
  6: {
    title: "Học Bài Cùng Nhau",
    description: "Những buổi chiều ở lại lớp học bài nhóm, cùng nhau giải toán, ôn lý, học văn. Khi có bạn gặp khó khăn, cả nhóm lại cùng nhau động viên."
  },
  7: {
    title: "Picnic Cuối Năm",
    description: "Chuyến picnic đáng nhớ tại công viên, với đầy đủ đồ ăn, trò chơi và tiếng cười vui vẻ. Cả lớp cùng nướng bánh, chơi trò chơi tập thể."
  },
  8: {
    title: "Văn Nghệ 20/11",
    description: "Những tiết mục văn nghệ đặc sắc mà các bạn chuẩn bị tâm huyết để tri ân thầy cô. Từ hát, nhảy đến kịch."
  },
  9: {
    title: "Làm Project Nhóm",
    description: "Những đêm thức khuya làm project, cùng nhau research, thiết kế và thuyết trình. Team work makes the dream work!"
  },
  10: {
    title: "Mùa Thi Căng Thẳng",
    description: "Những ngày căng thẳng trước kỳ thi, nhưng cũng là lúc cả lớp gắn kết nhất. Cùng nhau ôn bài, động viên nhau."
  },
  11: {
    title: "Chuyến Dã Ngoại",
    description: "Chuyến đi dã ngoại cuối cấp với đầy đủ hoạt động teambuilding, cắm trại, và những trò chơi dưới trời."
  },
  12: {
    title: "Buổi Họp Lớp",
    description: "Buổi họp lớp cuối cùng, khi nhìn lại hành trình 3 năm đã qua. Từng kỷ niệm được ôn lại, từng câu chuyện được kể."
  },
  13: {
    title: "Thi Học Kỳ",
    description: "Những giờ phút căng thẳng trong phòng thi, nhưng cũng đầy niềm tin và quyết tâm. Sau khi thi xong, cả lớp lại sum họp và chia sẻ cảm xúc."
  },
  14: {
    title: "Hoạt Động Ngoại Khóa",
    description: "Các buổi sinh hoạt CLB, hoạt động tình nguyện, giúp chúng ta trưởng thành và học hỏi nhiều điều bổ ích."
  },
  15: {
    title: "Lễ Bế Giảng",
    description: "Ngày chia tay đầy nước mắt. Mỗi người một nơi, nhưng tình bạn 3 năm sẽ mãi không phai."
  },
  16: {
    title: "Kỷ Niệm Không Bao Giờ Quên",
    description: "Dù thời gian có trôi qua, những kỷ niệm này sẽ mãi là hành trang tinh thần để chúng ta tiếp tục bước đi trên con đường phía trước."
  },
  17: {
    title: "Những Buổi Học Vui Vẻ",
    description: "Những tiết học không chỉ là kiến thức mà còn là tiếng cười, sự gắn bó và những kỷ niệm đáng nhớ với thầy cô và bạn bè."
  },
  18: {
    title: "Tạm Biệt Và Hẹn Gặp Lại",
    description: "Chia tay không phải là kết thúc, mà là khởi đầu cho những hành trình mới. Chúng ta sẽ luôn là một phần của nhau, dù ở bất kỳ đâu."
  }

};

// Lấy các elements
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// Mở modal khi click vào ảnh
document.querySelectorAll('.memory-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.stopPropagation();
    const memoryId = this.getAttribute('data-memory');
    const memory = memoriesData[memoryId];
    const imgSrc = this.querySelector('img').src;
    
    if (memory) {
      modalImage.src = imgSrc;
      modalImage.alt = memory.title;
      modalTitle.textContent = memory.title;
      modalDescription.textContent = memory.description;
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Đóng modal khi click vào overlay (ngoài content)
modalOverlay.addEventListener('click', function(e) {
  closeModal();
});

// Ngăn đóng modal khi click vào content
document.querySelector('.modal-content').addEventListener('click', function(e) {
  e.stopPropagation();
});

// Đóng modal khi nhấn ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Hàm đóng modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}



// PHẦN 16: CULTURAL FESTIVAL SECTION (8/3 & LỄ HỘI VĂN HÓA)
document.addEventListener('DOMContentLoaded', function() {
    const culturalSection = document.getElementById('cultural-section');
    
    if (!culturalSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation cho các phần tử
                const header = entry.target.querySelector('.cultural-header');
                const items = entry.target.querySelectorAll('.cultural-item, .cultural-card, .cultural-badge');
                
                if (header) {
                    header.style.animation = 'fadeInDown 0.8s ease forwards';
                }
                
                items.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.6s ease ${0.3 + index * 0.1}s forwards`;
                });
                
                // Animation cho stickers
                const stickers = entry.target.querySelectorAll('.cultural-sticker');
                stickers.forEach((sticker, index) => {
                    sticker.style.animation = `popIn 0.5s ease ${0.8 + index * 0.2}s forwards`;
                });
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(culturalSection);

    // Thêm keyframes nếu chưa có
    if (!document.querySelector('#cultural-keyframes')) {
        const style = document.createElement('style');
        style.id = 'cultural-keyframes';
        style.textContent = `
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes popIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                80% {
                    transform: scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes floatSticker {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-10px) rotate(5deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
});



// PHẦN 17: SUMMARY SECTION (TỔNG KẾT)
document.addEventListener('DOMContentLoaded', function() {
    const summarySection = document.getElementById('summary-section');
    
    if (!summarySection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation cho các phần tử
                const title = entry.target.querySelector('.summary-main-title');
                const fullImage = entry.target.querySelector('.summary-full-image');
                const diagonalImages = entry.target.querySelectorAll('.diagonal-image-item');
                const textBoxes = entry.target.querySelectorAll('.summary-text-box');
                
                if (title) {
                    title.style.animation = 'titleZoom 1s ease forwards';
                }
                
                if (fullImage) {
                    fullImage.style.animation = 'fadeInUp 1s ease 0.2s forwards';
                }
                
                diagonalImages.forEach((img, index) => {
                    img.style.animation = `diagonalSlide 0.8s ease ${0.5 + index * 0.2}s forwards`;
                });
                
                textBoxes.forEach((text, index) => {
                    text.style.animation = `textPop 0.6s ease ${1 + index * 0.2}s forwards`;
                });
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(summarySection);

    // Thêm keyframes nếu chưa có
    if (!document.querySelector('#summary-keyframes')) {
        const style = document.createElement('style');
        style.id = 'summary-keyframes';
        style.textContent = `
            @keyframes titleZoom {
                0% {
                    opacity: 0;
                    transform: scale(0.8) translateY(-30px);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes diagonalSlide {
                0% {
                    opacity: 0;
                    transform: translateX(100px) translateY(100px) rotate(0deg);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0) translateY(0) rotate(var(--rotate, 0deg));
                }
            }
            
            @keyframes textPop {
                0% {
                    opacity: 0;
                    transform: scale(0.9);
                }
                50% {
                    transform: scale(1.05);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes gentleSway {
                0%, 100% {
                    transform: rotate(var(--rotate, 0deg)) translateY(0);
                }
                50% {
                    transform: rotate(var(--rotate, 0deg)) translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
});


// PHẦN 18: CLUB SECTION (CÂU LẠC BỘ)
document.addEventListener('DOMContentLoaded', function() {
    const clubSection = document.getElementById('club-section');
    
    if (!clubSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation cho các phần tử
                const title = entry.target.querySelector('.club-main-title');
                const subtitle = entry.target.querySelector('.club-subtitle');
                const cards = entry.target.querySelectorAll('.club-card');
                const description = entry.target.querySelector('.club-description');
                
                if (title) {
                    title.style.animation = 'titleGlow 1s ease forwards';
                }
                
                if (subtitle) {
                    subtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
                }
                
                cards.forEach((card, index) => {
                    card.style.animation = `fadeInScale 0.6s ease ${0.3 + index * 0.1}s forwards`;
                });
                
                if (description) {
                    description.style.animation = 'fadeInScale 0.8s ease 1.2s forwards';
                }
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(clubSection);

    // Thêm keyframes nếu chưa có
    if (!document.querySelector('#club-keyframes')) {
        const style = document.createElement('style');
        style.id = 'club-keyframes';
        style.textContent = `
            @keyframes titleGlow {
                0% {
                    opacity: 0;
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes floatIcon {
                0%, 100% { transform: translateY(-50%) scale(1); }
                50% { transform: translateY(-50%) scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
});


// PHẦN 19: TEAMS SECTION (CÁC ĐỘI TUYỂN)
document.addEventListener('DOMContentLoaded', function() {
    const teamsSection = document.getElementById('teams-section');
    
    if (!teamsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation cho các phần tử
                const title = entry.target.querySelector('.teams-main-title');
                const subtitle = entry.target.querySelector('.teams-subtitle');
                const teamCards = entry.target.querySelectorAll('.team-card');
                const teamRows = entry.target.querySelectorAll('.team-row');
                
                if (title) {
                    title.style.animation = 'titleGlow 0.8s ease forwards';
                }
                
                if (subtitle) {
                    subtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
                }
                
                teamCards.forEach((card, index) => {
                    card.style.animation = `fadeInScale 0.5s ease ${0.3 + index * 0.1}s forwards`;
                });
                
                teamRows.forEach((row, index) => {
                    row.style.animation = `fadeInUp 0.6s ease ${0.6 + index * 0.2}s forwards`;
                });
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(teamsSection);

    // Thêm keyframes nếu chưa có
    if (!document.querySelector('#teams-keyframes')) {
        const style = document.createElement('style');
        style.id = 'teams-keyframes';
        style.textContent = `
            @keyframes titleGlow {
                0% {
                    opacity: 0;
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes borderGlow {
                0%, 100% {
                    border-color: #333;
                }
                50% {
                    border-color: #8a4fff;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ===== RIGHT SIDE NAVIGATION BAR - FIXED =====
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    const progressEl = document.getElementById('scrollProgress');
    const navBar = document.querySelector('.right-nav-bar');
    
    if (!navItems.length) return;
    
    // Danh sách sections từ data-section
    const sections = [];
    navItems.forEach(item => {
        const sectionId = item.dataset.section;
        if (document.getElementById(sectionId)) {
            sections.push(sectionId);
        }
    });
    
    // Click vào nav item
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 90;
                const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                targetSection.classList.add('section-highlight');
                setTimeout(() => {
                    targetSection.classList.remove('section-highlight');
                }, 1000);
            }
        });
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update active nav item và progress khi scroll
    function updateActiveNav() {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 90;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
        
        if (progressEl) {
            const percent = Math.min(100, Math.max(0, Math.round(scrolled)));
            progressEl.textContent = percent + '%';
        }
        
        let currentSectionIndex = -1;
        
        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const offsetTop = section.offsetTop;
                const offsetBottom = offsetTop + section.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                    currentSectionIndex = i;
                    break;
                }
            }
        }
        
        navItems.forEach((item, index) => {
            if (index === currentSectionIndex) {
                item.classList.add('active');
                
                if (navBar) {
                    const itemTop = item.offsetTop;
                    const itemBottom = itemTop + item.offsetHeight;
                    const navTop = navBar.scrollTop;
                    const navBottom = navTop + navBar.clientHeight;
                    
                    if (itemTop < navTop || itemBottom > navBottom) {
                        item.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    window.addEventListener('resize', function() {
        updateActiveNav();
    });
    
    setTimeout(updateActiveNav, 100);
});

// ===== RESPONSIVE FIXES =====
function fixMobileLayout() {
    const width = window.innerWidth;
    
    if (width <= 768) {
        document.querySelectorAll('.corner-image, .polaroid-frame, .diagonal-image-item, .stack-item').forEach(el => {
            if (el) el.style.transform = 'none';
        });
        
        document.querySelectorAll('.polaroid-tape, .mini-polaroid, .decor-cam, .decor-star').forEach(el => {
            if (el) el.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.polaroid-tape, .mini-polaroid, .decor-cam, .decor-star').forEach(el => {
            if (el) el.style.display = '';
        });
    }
}

// Chạy khi load và khi resize
document.addEventListener('DOMContentLoaded', function() {
    fixMobileLayout();
    window.addEventListener('resize', fixMobileLayout);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
    // Chạy khi load và khi resize
document.addEventListener('DOMContentLoaded', function() {
    fixMobileLayout();
    window.addEventListener('resize', fixMobileLayout);

    // Fix smooth scroll cho mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// ===== LOADING SCREEN WITH FADE IN EFFECT =====
document.addEventListener('DOMContentLoaded', function() {
    // Text chạy theo vòng tròn
    const text = " OIZOIOICON NĂM LỚP 10 ";
    const rotatingText = document.getElementById('rotatingText');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Tạo các chữ xoay tròn với hiệu ứng fade in
    if (rotatingText) {
        let html = '';
        for (let i = 0; i < text.length; i++) {
            html += `<i style="--i: ${i};">${text[i]}</i>`;
        }
        rotatingText.innerHTML = html;
    }
    
    // Lấy tất cả các chữ để theo dõi
    const letters = document.querySelectorAll('.text-circle span i');
    
    // Giả lập quá trình loading
    let progress = 0;
    const loadingTime = 3000; // 3 giây
    const interval = 30; // Cập nhật mỗi 30ms
    
    const loadingInterval = setInterval(function() {
        progress += (interval / loadingTime) * 100;
        
        // Kích hoạt hiệu ứng hoàn thành cho từng chữ dựa trên progress
        if (letters.length > 0) {
            const letterProgress = Math.floor((progress / 100) * letters.length);
            
            // Thêm class loaded cho các chữ đã hoàn thành
            for (let i = 0; i < letterProgress; i++) {
                if (i < letters.length && !letters[i].classList.contains('loaded')) {
                    letters[i].classList.add('loaded');
                }
            }
        }
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Đảm bảo tất cả chữ đều có class loaded
            letters.forEach(letter => {
                letter.classList.add('loaded');
            });
            
            // ẨN MÀN HÌNH LOADING (không xóa text)
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                
                // Cho phép scroll
                document.body.style.overflow = '';
                
                // Bắt đầu các animation khác
                startMainAnimations();
                
                // VẪN GIỮ LẠI TEXT - không xóa
                // Các chữ vẫn hiển thị trên màn hình loading đang fade out
                
            }, 800);
        }
        
        // Cập nhật phần trăm và thanh loading
        if (loadingPercent) {
            loadingPercent.textContent = Math.floor(progress);
        }
        
        if (loadingBarFill) {
            loadingBarFill.style.width = progress + '%';
        }
        
    }, interval);
    
    // Không cho scroll khi đang loading
    document.body.style.overflow = 'hidden';
    
    // Hàm bắt đầu các animation chính sau loading
    function startMainAnimations() {
        // Kích hoạt các observer
        const quoteSection = document.querySelector('.quote-section');
        if (quoteSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        quoteSection.classList.add('visible');
                    }
                });
            });
            observer.observe(quoteSection);
        }
        
        // Kích hoạt các scroll reveal
        const reveals = document.querySelectorAll('.scroll-reveal');
        reveals.forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            });
            observer.observe(el);
        });
    }
});

// ===== ENDING NOTIFICATION =====
document.addEventListener('DOMContentLoaded', function() {
    const endingNotification = document.getElementById('endingNotification');
    const endingCloseBtn = document.getElementById('endingCloseBtn');
    const finalSection = document.getElementById('final-memory-strip-section');
    
    // Biến để kiểm tra đã hiện thông báo chưa
    let hasShownEnding = false;
    
    // Hàm hiển thị thông báo kết thúc
    function showEndingNotification() {
        if (!hasShownEnding && endingNotification) {
            endingNotification.classList.add('show');
            hasShownEnding = true;
            
            // Tạo hiệu ứng âm thầm (có thể thay bằng hiệu ứng khác)
            createConfetti();
            
            // Tự động cuộn lên một chút để thấy thông báo rõ hơn
            setTimeout(() => {
                endingNotification.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
        }
    }
    
    // Hàm tạo hiệu ứng confetti đơn giản
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    width: 10px;
                    height: 20px;
                    background: hsl(${Math.random() * 360}, 100%, 50%);
                    border-radius: 3px;
                    z-index: 100001;
                    animation: confettiFall 3s linear forwards;
                    pointer-events: none;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }
    
    // Theo dõi khi người dùng cuộn đến phần cuối
    function checkEndingSection() {
        if (hasShownEnding || !finalSection) return;
        
        const rect = finalSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Kiểm tra nếu đã cuộn qua 70% của section cuối
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
            showEndingNotification();
        }
    }
    
    // Thêm event listener cho scroll
    window.addEventListener('scroll', function() {
        // Dùng requestAnimationFrame để tối ưu performance
        if (!hasShownEnding) {
            window.requestAnimationFrame(checkEndingSection);
        }
    });
    
    // Nút đóng thông báo
    if (endingCloseBtn) {
        endingCloseBtn.addEventListener('click', function() {
            endingNotification.classList.remove('show');
            
            // Cuộn lên đầu trang để xem lại
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Click bên ngoài để đóng (tùy chọn)
    if (endingNotification) {
        endingNotification.addEventListener('click', function(e) {
            if (e.target === endingNotification) {
                endingNotification.classList.remove('show');
            }
        });
    }
    
    // Kiểm tra ngay khi load (nếu đã ở cuối trang)
    setTimeout(checkEndingSection, 1000);
    
    // Thêm keyframes cho confetti nếu chưa có
    if (!document.querySelector('#ending-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ending-keyframes';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});