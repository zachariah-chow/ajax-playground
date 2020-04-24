const React = require("react");

class AjaxPlayground extends React.Component {

    render() {

        return (
            <html>
                <script defer src="scripts/ajax-script.js" />
                <link rel="stylesheet" href="css/main.css" />
                <body>
                    <main>
                        <div className="form__wrapper">
                                <h2 className="add-form__header">AJAX PLAYGROUND</h2>
                                <button className="add-form__submit-btn" type="submit">REQUEST</button>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AjaxPlayground;

//Add forms within form__wrapper to test other AJAX requests