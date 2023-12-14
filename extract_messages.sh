#!/bin/bash

set -e

cd "$(dirname "$0")"

source .venv/bin/activate

python setup.py extract_messages -o oarepo_user_dashboard/translations/messages.pot -F babel.cfg

pybabel update -i oarepo_user_dashboard/translations/messages.pot -d oarepo_user_dashboard/translations/