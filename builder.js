document.getElementById('bricks-builder-iframe').addEventListener('load', function () {
    const bricksIframe = document.getElementById('bricks-builder-iframe');

    const vueGlobalProp = document.querySelector('.brx-body').__vue_app__.config.globalProperties;
    const vueGlobalPropIframe = bricksIframe.contentDocument.querySelector('.brx-body').__vue_app__.config.globalProperties;

    const previewStyle = document.createElement('style');
    previewStyle.id = 'ykf-brx-preview-global-classes';

    bricksIframe.contentWindow.document.head.appendChild(previewStyle);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const target = mutation.target;

            if (target.classList.contains('active-class')) {
                if (target.classList.contains('show-popup')) {
                    const classListItems = document.querySelectorAll('.css-classes ul:last-child li');

                    classListItems.forEach((classItem) => {
                        const className = classItem.querySelector('.name').innerText.replace('.', '');

                        classItem.addEventListener('mouseenter', (e) => {
                            addClass(className);
                        });

                        classItem.addEventListener('mouseleave', (e) => {
                            resetClass();
                        });

                        classItem.addEventListener('click', (e) => {
                            if (e.target.tagName !== 'LI' && e.target.tagName !== 'SPAN') {
                                return;
                            }

                            resetClass();
                        });
                    });
                }
            }
        });
    });

    observer.observe(document.querySelector('#bricks-panel-inner'), {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });

    function addClass(className) {
        const activeEl = vueGlobalPropIframe.$_activeElement.value;
        const elementNode = vueGlobalPropIframe.$_getElementNode(activeEl);

        previewStyle.innerHTML = vueGlobalProp.$_generateCss('globalClass', getClassIdByName(className), [activeEl.name]);

        elementNode.classList.add(className);
    }

    function resetClass() {
        const activeEl = vueGlobalPropIframe.$_activeElement.value;
        const elementNode = vueGlobalPropIframe.$_getElementNode(activeEl);

        const elementClasses = vueGlobalPropIframe.$_getElementClasses(activeEl);

        elementNode.classList.value = elementClasses.join(' ');
    }

    function getClassIdByName(className) {
        return vueGlobalProp.$_globalClasses.value.find((globalClass) => globalClass.name === className).id;
    }
});
