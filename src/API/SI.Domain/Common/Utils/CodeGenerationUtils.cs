using Diacritics.Extensions;
using System.Text;

namespace SI.Domain.Common.Utils;

/// <summary>
/// Utility class for generating codes from text and related functions
/// </summary>
public static class CodeGenerationUtils
{
    private static readonly Random _random = new Random();

    /// <summary>
    /// Generates a code from a name by taking the first letter of each word and adding random digits
    /// </summary>
    /// <param name="name">The name to generate code from</param>
    /// <param name="digitCount">Number of random digits to append (default: 4)</param>
    /// <param name="defaultPrefix">Default prefix if name is empty (default: "CAT")</param>
    /// <returns>A code generated from the name</returns>
    public static string GenerateCodeFromName(string? name, int digitCount = 4, string defaultPrefix = "")
    {
        if (string.IsNullOrWhiteSpace(name))
            return defaultPrefix + GenerateRandomDigits(digitCount);

        // First normalize the entire name to remove diacritics
        var normalizedName = name.RemoveDiacritics();

        // Then split into words and get first letter of each word
        var words = normalizedName.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        var firstLetters = string.Join("", words.Select(w => w.Length > 0 ? w[0].ToString().ToUpper() : ""));

        // Ensure we have at least one character
        if (string.IsNullOrEmpty(firstLetters))
            firstLetters = defaultPrefix;

        // Add random digits
        return firstLetters + GenerateRandomDigits(digitCount);
    }

    /// <summary>
    /// Generates a string of random digits of specified length
    /// </summary>
    /// <param name="length">The number of digits to generate</param>
    /// <returns>A string of random digits</returns>
    public static string GenerateRandomDigits(int length)
    {
        var digits = new StringBuilder();
        for (int i = 0; i < length; i++)
        {
            digits.Append(_random.Next(0, 10));
        }
        return digits.ToString();
    }

    /// <summary>
    /// Extracts the first letter of each word in a string
    /// </summary>
    /// <param name="text">The text to extract first letters from</param>
    /// <returns>String containing the first letter of each word</returns>
    public static string ExtractFirstLetters(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        var words = text.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        return string.Join("", words.Select(w => w.Length > 0 ? w[0].ToString() : ""));
    }
}