from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation


def password_mismatch(password1: str, password2: str):
    if password1 != password2:
        raise ValidationError({"password": "Passwords do not match"})


def password_validationAPI(password: str, user=None):
    error = dict()
    try:
        password_validation.validate_password(password=password, user=user)
    except ValidationError as e:
        error["password"] = e.messages

    if error:
        raise ValidationError(error)
