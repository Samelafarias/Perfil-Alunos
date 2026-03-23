document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const colorToggle = document.getElementById('global-color-toggle');
    const body = document.body;
    const allCardsGrid = document.querySelectorAll('.profile-grid .profile-card');
    const modal = document.getElementById('profile-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalDynamicContent = document.getElementById('modal-dynamic-content');
    const btnCloseModal = modal.querySelector('.btn-close-modal');
    const globalAvatarInput = document.getElementById('global-avatar-input');
    let currentAvatarImgToUpdate = null;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        themeIcon.innerText = body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
    });

    let globalColorIndex = 1;
    colorToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        globalColorIndex = (globalColorIndex % 3) + 1; 
        allCardsGrid.forEach(card => card.setAttribute('data-color', globalColorIndex));
    });

    allCardsGrid.forEach(card => {
        const btnFollow = card.querySelector('.btn-follow');
        const btnText = btnFollow.querySelector('.btn-text');
        const btnIconFollow = btnFollow.querySelector('.material-icons-outlined');
        const followerSpan = card.querySelector('[data-followers]');
        const btnViewProfile = card.querySelector('.btn-message'); 
        const btnEditAvatar = card.querySelector('.btn-edit-avatar');
        const avatarImg = card.querySelector('.avatar-img');

        let isFollowing = false;
        let count = parseFloat(followerSpan.innerText.replace('k', '')) * (followerSpan.innerText.includes('k') ? 1000 : 1);

        btnFollow.addEventListener('click', (e) => {
            e.stopPropagation(); 
            isFollowing = !isFollowing;
            count = isFollowing ? count + 1 : count - 1;
            btnText.innerText = isFollowing ? 'Seguindo' : 'Seguir';
            btnIconFollow.innerText = isFollowing ? 'how_to_reg' : 'person_add';
            btnFollow.classList.toggle('following', isFollowing);
            followerSpan.innerText = count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
        });

        btnViewProfile.addEventListener('click', (e) => {
            e.stopPropagation(); 
            modalDynamicContent.innerHTML = card.innerHTML;
            modalContent.setAttribute('data-color', card.getAttribute('data-color'));
            modal.classList.add('open');
            body.style.overflow = 'hidden'; 
        });

        btnEditAvatar.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentAvatarImgToUpdate = avatarImg;
            globalAvatarInput.click();
        });
    });

    globalAvatarInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file && currentAvatarImgToUpdate) {
            const reader = new FileReader();
            reader.onload = (e) => currentAvatarImgToUpdate.src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    btnCloseModal.addEventListener('click', () => {
        modal.classList.remove('open');
        body.style.overflow = ''; 
    });

    modal.addEventListener('click', (e) => { if (e.target === modal) btnCloseModal.click(); });
});