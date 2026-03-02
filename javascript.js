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


// ===== LOADING SCREEN WITH VINYL RECORD =====
document.addEventListener('DOMContentLoaded', function() {
    // Text chạy theo vòng tròn - "Back to 2023-2024 with Oizoicon"
    const text = " BACK TO 2023-2024 WITH OIZOICON ";
    const rotatingText = document.getElementById('rotatingText');
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Tạo các chữ xoay tròn
    if (rotatingText) {
        let html = '';
        for (let i = 0; i < text.length; i++) {
            html += `<i style="--i: ${i};">${text[i]}</i>`;
        }
        rotatingText.innerHTML = html;
    }
    
    // Lấy tất cả các chữ
    const letters = document.querySelectorAll('.text-circle span i');
    
    // Giả lập quá trình loading
    let progress = 0;
    const loadingTime = 3500; // 3.5 giây
    const interval = 30;
    
    // Thêm hiệu ứng fade in cho từng chữ theo thứ tự
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.classList.add('loaded');
        }, 100 + (index * 50)); // Mỗi chữ cách nhau 50ms
    });
    
    const loadingInterval = setInterval(function() {
        progress += (interval / loadingTime) * 100;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Đảm bảo tất cả chữ đều hiển thị
            letters.forEach(letter => {
                letter.style.opacity = '1';
                letter.classList.add('loaded');
            });
            
            // Ẩn màn hình loading sau khi hoàn tất
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Kích hoạt các animation khác
                startMainAnimations();
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
        // Kích hoạt các observer cho các section
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
    
    // Thêm hiệu ứng đặc biệt khi loading gần xong
    let lastProgress = 0;
    const checkProgress = setInterval(() => {
        if (progress > lastProgress) {
            lastProgress = progress;
            
            // Khi progress đạt các mốc, tạo hiệu ứng
            if (progress > 30 && progress < 35) {
                createNoteEffect();
            }
            if (progress > 60 && progress < 65) {
                createNoteEffect();
            }
            if (progress > 90 && progress < 95) {
                createNoteEffect();
            }
        }
    }, 100);
    
    function createNoteEffect() {
        const notes = ['♪', '♫', '♬', '♩'];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const note = document.createElement('div');
                note.className = 'note-animation';
                note.textContent = notes[Math.floor(Math.random() * notes.length)];
                note.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    color: #ffd700;
                    font-size: ${20 + Math.random() * 20}px;
                    animation: noteFloat 2s ease-out forwards;
                    pointer-events: none;
                    z-index: 10;
                `;
                document.querySelector('.loader-container').appendChild(note);
                
                setTimeout(() => note.remove(), 2000);
            }, i * 100);
        }
    }
});
// ===== ENDING NOTIFICATION WITH VINYL RECORD =====
document.addEventListener('DOMContentLoaded', function() {
    const endingNotification = document.getElementById('endingNotification');
    const endingCloseBtn = document.getElementById('endingCloseBtn');
    const finalSection = document.getElementById('final-memory-strip-section');
    const endingRecord = document.getElementById('endingRecord');
    const endingTonearm = document.getElementById('endingTonearm');
    
    let hasShownEnding = false;
    
    function showEndingNotification() {
        if (!hasShownEnding && endingNotification) {
            endingNotification.classList.add('show');
            hasShownEnding = true;
            
            // Đĩa đang quay, sau đó ngừng và cần gạt rời đi
            setTimeout(() => {
                // Đĩa ngừng quay
                if (endingRecord) {
                    endingRecord.style.animation = 'none';
                }
                
                // Cần gạt rời khỏi đĩa
                setTimeout(() => {
                    if (endingTonearm) {
                        endingTonearm.classList.add('move-away');
                    }
                    
                    // Tạo hiệu ứng nốt nhạc bay lên
                    createEndingNoteEffect();
                    
                }, 800);
            }, 1500);
            
            setTimeout(() => {
                endingNotification.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
        }
    }
    
    function createEndingNoteEffect() {
        const notes = ['♪', '♫', '♬', '♩'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const note = document.createElement('div');
                note.className = 'ending-note';
                note.textContent = notes[Math.floor(Math.random() * notes.length)];
                note.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: ${20 + Math.random() * 60}%;
                    color: #ffd700;
                    font-size: ${20 + Math.random() * 30}px;
                    animation: endingNoteFloat 3s ease-out forwards;
                    pointer-events: none;
                    z-index: 100001;
                    text-shadow: 0 0 15px #ffd700;
                `;
                document.body.appendChild(note);
                
                setTimeout(() => note.remove(), 3000);
            }, i * 100);
        }
    }
    
    function checkEndingSection() {
        if (hasShownEnding || !finalSection) return;
        
        const rect = finalSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hiện khi cuộn qua 70% của section cuối
        if (rect.top < windowHeight * 0.3 && rect.bottom > 0) {
            showEndingNotification();
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!hasShownEnding) {
            window.requestAnimationFrame(checkEndingSection);
        }
    });
    
    if (endingCloseBtn) {
        endingCloseBtn.addEventListener('click', function() {
            endingNotification.classList.remove('show');
            
            // Reset trạng thái đĩa và cần gạt
            if (endingRecord) {
                endingRecord.style.animation = 'endingSpin 3s linear infinite';
            }
            if (endingTonearm) {
                endingTonearm.classList.remove('move-away');
            }
            
            // Cuộn lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (endingNotification) {
        endingNotification.addEventListener('click', function(e) {
            if (e.target === endingNotification) {
                endingNotification.classList.remove('show');
                
                if (endingRecord) {
                    endingRecord.style.animation = 'endingSpin 3s linear infinite';
                }
                if (endingTonearm) {
                    endingTonearm.classList.remove('move-away');
                }
            }
        });
    }
    
    setTimeout(checkEndingSection, 1000);
    
   
});


// ===== RIPPLE EFFECT =====
class RippleEffect {
    constructor() {
        this.init();
    }
    
    init() {
        // Thêm ripple cho tất cả các phần tử có thể click
        const clickableElements = [
            '.nav-item',
            '.control-btn',
            '.scroll-top-btn',
            '.feedback-btn',
            '.ending-close-btn',
            '.polaroid-frame',
            '.grid-item',
            '.photo-frame',
            '.club-card',
            '.team-card',
            '.nav-link',
            '.memory-card',
            '.grid-item',
            '.extra-item'
        ];
        
        clickableElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('ripple-container');
                element.addEventListener('click', this.createRipple.bind(this));
            });
        });
        
        // Ripple đặc biệt cho navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', this.createMusicRipple.bind(this));
        });
        
        // Ripple cho ảnh polaroid
        document.querySelectorAll('.polaroid-frame, .photo-frame').forEach(item => {
            item.addEventListener('click', this.createPolaroidRipple.bind(this));
        });
    }
    
    createRipple(e) {
        const element = e.currentTarget;
        
        // Xóa ripple cũ nếu có
        const oldRipple = element.querySelector('.ripple-effect');
        if (oldRipple) oldRipple.remove();
        
        // Tạo ripple mới
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        // Tính toán vị trí
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Set style
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Xóa sau khi animation kết thúc
        setTimeout(() => ripple.remove(), 800);
    }
    
    createMusicRipple(e) {
        const element = e.currentTarget;
        
        // Tạo ripple hình nốt nhạc
        const ripple = document.createElement('span');
        ripple.className = 'ripple-music';
        
        const rect = element.getBoundingClientRect();
        const size = 100;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Tạo thêm các nốt nhạc nhỏ bay ra
        for (let i = 0; i < 5; i++) {
            this.createFloatingNote(e.clientX, e.clientY);
        }
        
        setTimeout(() => ripple.remove(), 1000);
    }
    
    createPolaroidRipple(e) {
        const element = e.currentTarget;
        
        // Tạo nhiều ripple cùng lúc
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.background = `radial-gradient(circle, rgba(255, 215, 0, ${0.3 + i * 0.2}) 0%, transparent 70%)`;
                
                const rect = element.getBoundingClientRect();
                const size = 80 + i * 30;
                const x = e.clientX - rect.left - size / 2 + (Math.random() - 0.5) * 50;
                const y = e.clientY - rect.top - size / 2 + (Math.random() - 0.5) * 50;
                
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                element.appendChild(ripple);
                setTimeout(() => ripple.remove(), 800);
            }, i * 100);
        }
    }
    
    createFloatingNote(x, y) {
        const note = document.createElement('div');
        const notes = ['♪', '♫', '♬', '♩'];
        note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: #ffd700;
            font-size: ${20 + Math.random() * 20}px;
            font-weight: bold;
            text-shadow: 0 0 15px #ffd700;
            pointer-events: none;
            z-index: 10000;
            animation: noteFloat 1s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(note);
        
        setTimeout(() => note.remove(), 1000);
    }
}

// Khởi tạo Ripple Effect khi DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rippleEffect = new RippleEffect();
});

// ===== PARTICLE SYSTEM WITH THREE.JS =====
class ParticleSystem {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };
        this.scrollSpeed = 0;
        this.lastScrollY = 0;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        // Kiểm tra thiết bị di động - giảm chất lượng nếu cần
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 150 : 400;
        
        // Tạo scene
        this.scene = new THREE.Scene();
        
        // Tạo camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = isMobile ? 80 : 50;
        
        // Tạo renderer trong suốt
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: !isMobile
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(isMobile ? 1 : window.devicePixelRatio);
        this.renderer.domElement.id = 'particle-canvas';
        
        // Thêm vào body
        document.body.appendChild(this.renderer.domElement);
        
        // Tạo particle texture
        const texture = this.createParticleTexture();
        
        // Tạo geometry
        const geometry = new THREE.BufferGeometry();
        
        // Tạo positions và colors
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            // Phân bố trong hình cầu
            const radius = 30 + Math.random() * 40;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Màu sắc - gradient từ vàng sang hồng
            const color = new THREE.Color();
            const hue = 0.12 + Math.random() * 0.1; // Vàng đến cam
            color.setHSL(hue, 0.9, 0.6);
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Kích thước ngẫu nhiên
            sizes[i] = 0.3 + Math.random() * 0.7;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Material
        const material = new THREE.PointsMaterial({
            size: 0.4,
            map: texture,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Bind events
        this.bindEvents();
        
        // Start animation
        this.animate();
    }
    
    createParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        // Vẽ nốt nhạc
        ctx.fillStyle = 'white';
        ctx.font = '24px "Caveat", "Arial"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Random giữa các nốt nhạc khác nhau
        const notes = ['♪', '♫', '♬', '♩'];
        ctx.fillText(notes[Math.floor(Math.random() * notes.length)], 16, 16);
        
        // Thêm glow effect
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        
        return new THREE.CanvasTexture(canvas);
    }
    
    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            // Target rotation dựa trên mouse
            this.targetRotation.y = this.mouseX * 2;
            this.targetRotation.x = this.mouseY * 1.5;
        });
        
        // Scroll speed detection
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            this.scrollSpeed = Math.abs(currentScroll - this.lastScrollY) * 0.01;
            this.lastScrollY = currentScroll;
            
            // Giới hạn scroll speed
            this.scrollSpeed = Math.min(this.scrollSpeed, 2);
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Section enter effects
        this.setupSectionEffects();
    }
    
    setupSectionEffects() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => this.onSectionEnter(index),
                onLeave: () => this.onSectionLeave(index),
                onEnterBack: () => this.onSectionEnter(index),
                onLeaveBack: () => this.onSectionLeave(index)
            });
        });
    }
    
    onSectionEnter(index) {
        // Thay đổi màu sắc particles khi vào section
        const colors = [
            { h: 0.12, name: 'khai giảng' },  // Vàng
            { h: 0.0, name: 'quote' },         // Đỏ
            { h: 0.6, name: 'polaroid' },      // Xanh
            { h: 0.8, name: 'nhật ký' },       // Tím
            { h: 0.1, name: '20/11' },          // Cam
        ];
        
        const colorIndex = index % colors.length;
        this.pulseColor(colors[colorIndex].h);
    }
    
    onSectionLeave(index) {
        // Reset màu
        this.pulseColor(0.12);
    }
    
    pulseColor(hue) {
        // Thay đổi màu dần dần
        const positions = this.particles.geometry.attributes.position.array;
        const colors = this.particles.geometry.attributes.color.array;
        
        for (let i = 0; i < colors.length; i += 3) {
            const color = new THREE.Color();
            color.setHSL(hue + (Math.random() - 0.5) * 0.1, 0.9, 0.6);
            
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        this.particles.geometry.attributes.color.needsUpdate = true;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        // Smooth rotation
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        
        // Thêm hiệu ứng từ scroll
        if (this.scrollSpeed > 0) {
            this.currentRotation.z += this.scrollSpeed * 0.02;
            this.scrollSpeed *= 0.95; // Giảm dần
        }
        
        // Apply rotation
        if (this.particles) {
            this.particles.rotation.x = this.currentRotation.x;
            this.particles.rotation.y = this.currentRotation.y;
            
            // Pulse effect dựa trên scroll position
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            this.particles.scale.setScalar(1 + Math.sin(Date.now() * 0.001) * 0.1 + scrollProgress * 0.5);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    // Clean up
    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
    }
}

// ===== RIÊNG CHO MOBILE =====
class MobileParticleSystem {
    constructor() {
        // Phiên bản đơn giản hóa cho mobile
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.init();
    }
    
    init() {
        document.body.appendChild(this.canvas);
        this.resize();
        
        // Tạo particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random(),
                y: Math.random(),
                size: 2 + Math.random() * 3,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                note: ['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)]
            });
        }
        
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            // Di chuyển
            p.x += p.speedX * 0.01;
            p.y += p.speedY * 0.01;
            
            // Wrap around
            if (p.x < 0) p.x = 1;
            if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y = 1;
            if (p.y > 1) p.y = 0;
            
            // Vẽ
            this.ctx.font = `${p.size * 8}px "Caveat"`;
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            this.ctx.fillText(p.note, p.x * this.canvas.width, p.y * this.canvas.height);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

