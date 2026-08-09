/**
 * Repository Monochrome Activator Script
 * Turns all code elements and file viewports in the repository black and white.
 */
(function activateRepositoryMonochrome() {
    const styleId = 'repo-monochrome-global-style';
    
    // Check if monochrome mode is already injected, toggle off if so
    if (document.getElementById(styleId)) {
        document.getElementById(styleId).remove();
        console.log('Monochrome mode deactivated.');
        return false;
    }
    
    // Create and inject high-contrast grayscale style rule
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        * {
            filter: grayscale(100%) contrast(125%) !important;
        }
    `;
    document.head.appendChild(style);
    console.log('Monochrome mode activated across repository.');
    return true;
})();
