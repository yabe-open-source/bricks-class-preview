const bricksIframe = window.bricksIframe || document.getElementById('bricks-builder-iframe');

bricksIframe.addEventListener('load', function () {
    if (window.yabeVueGlobalProp === undefined) {
        window.yabeVueGlobalProp = document.querySelector('.brx-body').__vue_app__.config.globalProperties;
        window.yabeVueGlobalPropIframe = bricksIframe.contentDocument.querySelector('.brx-body').__vue_app__.config.globalProperties;
    }

    init();
});

const previewStyle = document.createElement('style');
previewStyle.id = 'ykf-brx-preview-global-classes';

function init() {
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
}

function addClass(className) {
    const activeEl = window.yabeVueGlobalPropIframe.$_activeElement.value;
    const elementNode = window.yabeVueGlobalPropIframe.$_getElementNode(activeEl);

    previewStyle.innerHTML = window.yabeVueGlobalProp.$_generateCss('globalClass', getClassIdByName(className), ['block']).replaceAll('.brxe-block', '');

    elementNode.classList.add(className);
}

function resetClass() {
    const activeEl = window.yabeVueGlobalPropIframe.$_activeElement.value;
    const elementNode = window.yabeVueGlobalPropIframe.$_getElementNode(activeEl);

    const elementClasses = window.yabeVueGlobalPropIframe.$_getElementClasses(activeEl);

    elementNode.classList.value = elementClasses.join(' ');
}

function getClassIdByName(className) {
    return window.yabeVueGlobalProp.$_globalClasses.value.find((globalClass) => globalClass.name === className).id;
}