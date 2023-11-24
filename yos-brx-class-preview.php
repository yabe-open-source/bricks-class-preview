<?php

/**
 * @wordpress-plugin
 * Plugin Name:         Yabe Open Source - Bricks Class Preview
 * Plugin URI:          https://os.yabe.land
 * Description:         Bricks builder editor: Quick Class Preview
 * Version:             1.0.0-DEV
 * Requires at least:   6.0
 * Requires PHP:        7.4
 * Author:              Rosua
 * Author URI:          https://rosua.org
 * Donate link:         https://ko-fi.com/Q5Q75XSF7
 * Text Domain:         yabe-open-source-brx-class-preview
 * Domain Path:         /languages
 *
 * @package             Yabe Open Source
 * @author              Joshua Gugun Siagian <suabahasa@gmail.com>
 */

/*
 * This file is part of the Yabe Open Source package.
 *
 * (c) Joshua <suabahasa@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

add_action('wp_enqueue_scripts', 'yos_brx_class_preview', 1_000_001);

function yos_brx_class_preview()
{
    if (!function_exists('bricks_is_builder_main') || !bricks_is_builder_main()) {
        return;
    }

    wp_enqueue_script(
        'yos-brx-class-preview',
        plugins_url('builder.js', __FILE__),
        ['wp-hooks', 'bricks-builder',],
        (string) filemtime(__DIR__ . '/builder.js'),
        true
    );
}
